import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface GenerateReplyOptions {
  userId?: string;
  source?: 'whatsapp' | 'instagram' | 'messenger' | 'web';
}

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);

  constructor(private readonly prisma: PrismaService) {}

  private systemPrompt = `Eres BrightTour Assistant, un agente virtual avanzado especializado en turismo.

CAPACIDADES:
- Consultar paquetes turísticos con filtros avanzados
- Buscar por ubicación, precio, duración
- Mostrar itinerarios detallados día por día
- Explicar procesos de reserva y pagos

INSTRUCCIONES:
- Responde en español, de forma clara y amigable
- USA los datos de la base de datos cuando estén disponibles
- Si el usuario pregunta por un destino específico, filtra por ubicación
- Si menciona presupuesto o precio, filtra por rango de precios
- Si pregunta por itinerario o actividades, muestra los detalles día por día
- Ofrece alternativas útiles cuando no hay coincidencias exactas`;

  async generateReply(
    question: string,
    options: GenerateReplyOptions = {},
  ): Promise<string> {
    this.logger.log(
      `Generating reply for ${options.source || 'unknown'} user ${options.userId || 'unknown'}`,
    );
    const kb = await this.loadKnowledgeBase();
    const dbContext = await this.getSmartDatabaseContext(question);
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!openaiKey) {
      this.logger.warn(
        'OPENAI_API_KEY no configurada; usando respuestas básicas',
      );
      return this.basicReply(question, dbContext);
    }

    const messages = [
      { role: 'system', content: this.systemPrompt },
      { role: 'system', content: `Base de conocimiento:\n${kb}` },
      {
        role: 'system',
        content: `Contexto de la base de datos:\n${dbContext}`,
      },
      { role: 'user', content: question },
    ];

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages,
          temperature: 0.3,
          max_tokens: 500,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        this.logger.error(`OpenAI error: ${res.status} ${text}`);
        return this.basicReply(question, dbContext);
      }

      const data = await res.json();
      const answer = data?.choices?.[0]?.message?.content?.trim();
      return answer || this.basicReply(question, dbContext);
    } catch (err) {
      this.logger.error('Error llamando a OpenAI', err);
      return this.basicReply(question, dbContext);
    }
  }

  /**
   * Contexto inteligente que detecta intención y consulta específicamente
   */
  private async getSmartDatabaseContext(question: string): Promise<string> {
    const q = question.toLowerCase();
    let context = '';

    try {
      // Detectar búsqueda por ubicación
      const locationKeywords = [
        'cartagena',
        'eje cafetero',
        'pereira',
        'santa marta',
        'tayrona',
        'bogotá',
        'amazonas',
        'leticia',
      ];
      const foundLocation = locationKeywords.find((loc) => q.includes(loc));

      // Detectar búsqueda por rango de precio
      const priceMatch = q.match(/(\d+)/);
      const maxBudget = priceMatch ? parseInt(priceMatch[1]) : null;

      // Detectar búsqueda por duración
      const durationMatch = q.match(/(\d+)\s*(día|dias)/);
      const requestedDuration = durationMatch
        ? parseInt(durationMatch[1])
        : null;

      // Detectar solicitud de itinerario detallado
      const wantsItinerary =
        q.includes('itinerario') ||
        q.includes('actividades') ||
        q.includes('día a día') ||
        q.includes('qué incluye');

      // Construir query dinámica
      const whereClause: any = { isActive: true };

      if (foundLocation) {
        whereClause.location = { contains: foundLocation, mode: 'insensitive' };
      }

      if (maxBudget) {
        whereClause.price = { lte: maxBudget };
      }

      if (requestedDuration) {
        whereClause.duration = requestedDuration;
      }

      const packages = await this.prisma.tourPackage.findMany({
        where: whereClause,
        take: 5,
        orderBy: { price: 'asc' },
        include: {
          itinerary: wantsItinerary ? { orderBy: { day: 'asc' } } : false,
        },
      });

      if (packages.length > 0) {
        context += '\n**Paquetes encontrados:**\n\n';

        packages.forEach((pkg, index) => {
          context += `${index + 1}. **${pkg.title}**\n`;
          context += `   📍 Ubicación: ${pkg.location}\n`;
          context += `   💰 Precio: $${String(pkg.price)} USD\n`;
          context += `   📅 Duración: ${pkg.duration} días\n`;
          context += `   👥 Capacidad: ${pkg.maxPeople} personas\n`;
          context += `   📝 ${pkg.description}\n`;

          // Si pidió itinerario, mostrarlo
          if (wantsItinerary && pkg.itinerary && pkg.itinerary.length > 0) {
            context += `\n   **Itinerario detallado:**\n`;
            pkg.itinerary.forEach((day) => {
              context += `   Día ${day.day}: ${day.title}\n`;
              context += `   ${day.description}\n\n`;
            });
          }

          context += '\n';
        });
      } else {
        context += '\n**No se encontraron paquetes** con esos criterios.\n';

        // Sugerir alternativas
        const allPackages = await this.prisma.tourPackage.findMany({
          where: { isActive: true },
          take: 3,
          orderBy: { price: 'asc' },
        });

        if (allPackages.length > 0) {
          context += '\n**Paquetes alternativos disponibles:**\n';
          allPackages.forEach((pkg) => {
            context += `- ${pkg.title} (${pkg.location}) - $${String(pkg.price)} - ${pkg.duration} días\n`;
          });
        }
      }

      // Estadísticas
      const stats = await this.getStatistics();
      context += `\n${stats}`;

      return context;
    } catch (err) {
      this.logger.error('Error obteniendo contexto de BD', err);
      return 'Error al consultar información en tiempo real.';
    }
  }

  /**
   * Obtiene estadísticas generales
   */
  private async getStatistics(): Promise<string> {
    try {
      const totalPackages = await this.prisma.tourPackage.count({
        where: { isActive: true },
      });
      const cheapestPackage = await this.prisma.tourPackage.findFirst({
        where: { isActive: true },
        orderBy: { price: 'asc' },
      });
      const mostExpensive = await this.prisma.tourPackage.findFirst({
        where: { isActive: true },
        orderBy: { price: 'desc' },
      });

      let stats = `\n**Información general:**\n`;
      stats += `📊 Total de paquetes: ${totalPackages}\n`;
      if (cheapestPackage)
        stats += `💵 Desde: $${String(cheapestPackage.price)}\n`;
      if (mostExpensive) stats += `💎 Hasta: $${String(mostExpensive.price)}\n`;

      return stats;
    } catch {
      return '';
    }
  }

  private async loadKnowledgeBase(): Promise<string> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const kbPath = path.resolve(__dirname, './knowledge-base.md');
      const content = await fs.readFile(kbPath, 'utf8');
      return content;
    } catch {
      return 'Sin base de conocimiento local.';
    }
  }

  private basicReply(question: string, dbContext: string): string {
    const q = (question || '').toLowerCase();

    // Si tenemos contexto de BD, úsalo
    if (dbContext && dbContext.includes('Paquetes encontrados')) {
      return `${dbContext}\n\n¿Te interesa alguno? Puedo darte más información.`;
    }

    if (q.includes('precio') || q.includes('costo') || q.includes('paquete')) {
      return 'Puedo mostrarte nuestros paquetes disponibles. ¿Qué destino te interesa o cuál es tu presupuesto?';
    }
    if (q.includes('reserv') || q.includes('book')) {
      return 'Para reservar, visita nuestro sitio web o contáctanos. ¿Ya tienes un paquete en mente?';
    }
    if (q.includes('pago') || q.includes('método')) {
      return 'Aceptamos: Tarjeta de crédito/débito, PayPal y transferencia bancaria.';
    }
    if (q.includes('hola') || q.includes('hi') || q.includes('buenos')) {
      return '¡Hola! 👋 Soy el asistente de BrightTour. Puedo ayudarte a encontrar el paquete turístico perfecto. ¿Buscas algún destino en particular?';
    }

    return 'Soy tu asistente BrightTour. Puedo ayudarte con:\n- Buscar paquetes por destino o precio\n- Ver itinerarios detallados\n- Información sobre reservas y pagos\n\n¿Qué necesitas?';
  }
}
