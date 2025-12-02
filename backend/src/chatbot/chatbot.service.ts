import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface GenerateReplyOptions {
  userId?: string;
  source?: 'whatsapp' | 'instagram' | 'messenger' | 'web';
}

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);

  constructor(private readonly prisma: PrismaService) {}

  private systemPrompt = `Eres BrightTour Assistant, un agente virtual especializado en turismo.
Ayudas a los usuarios con información sobre:
- Paquetes turísticos disponibles, precios y destinos
- Proceso de reservas y disponibilidad
- Métodos de pago aceptados
- Estado de reservas existentes

Responde en español de forma breve, clara y amigable.
Cuando tengas datos específicos de la base de datos, úsalos en tu respuesta.
Si el usuario pregunta por información que no tienes, ofrece alternativas útiles.`;

  /**
   * Genera una respuesta usando OpenAI con contexto de la base de datos
   */
  async generateReply(question: string, options: GenerateReplyOptions = {}): Promise<string> {
    const kb = await this.loadKnowledgeBase();
    const dbContext = await this.getDatabaseContext(question);
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!openaiKey) {
      this.logger.warn('OPENAI_API_KEY no configurada; usando respuestas básicas');
      return this.basicReply(question, dbContext);
    }

    const messages = [
      { role: 'system', content: this.systemPrompt },
      { role: 'system', content: `Base de conocimiento:\n${kb}` },
      { role: 'system', content: `Contexto de la base de datos:\n${dbContext}` },
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
          max_tokens: 300,
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
      this.logger.error('Error llamando a OpenAI', err as any);
      return this.basicReply(question, dbContext);
    }
  }

  /**
   * Obtiene contexto relevante de la base de datos según la pregunta
   */
  private async getDatabaseContext(question: string): Promise<string> {
    const q = question.toLowerCase();
    let context = '';

    try {
      // Si pregunta sobre paquetes, destinos, precios
      if (q.includes('paquete') || q.includes('tour') || q.includes('viaje') || 
          q.includes('destino') || q.includes('lugar') || q.includes('precio') ||
          q.includes('costo') || q.includes('cuánto')) {
        
        const packages = await this.prisma.tourPackage.findMany({
          where: { isActive: true },
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            itinerary: true,
          },
        });

        if (packages.length > 0) {
          context += '\n**Paquetes turísticos disponibles:**\n';
          packages.forEach(pkg => {
            context += `- ${pkg.title}\n`;
            context += `  Destino: ${pkg.location}\n`;
            context += `  Precio: $${pkg.price}\n`;
            context += `  Duración: ${pkg.duration} días\n`;
            context += `  Capacidad: ${pkg.maxPeople} personas\n`;
            context += `  Descripción: ${pkg.description.substring(0, 100)}...\n`;
          });
        }
      }

      // Si pregunta sobre reservas
      if (q.includes('reserv') || q.includes('book')) {
        const bookingsCount = await this.prisma.booking.count({
          where: { status: 'CONFIRMED' },
        });
        context += `\nReservas confirmadas activas: ${bookingsCount}\n`;
      }

      // Estadísticas generales útiles
      const totalPackages = await this.prisma.tourPackage.count({ where: { isActive: true } });
      context += `\nTotal de paquetes disponibles: ${totalPackages}\n`;

      return context || 'No hay información adicional de la base de datos.';
    } catch (err) {
      this.logger.error('Error obteniendo contexto de BD', err);
      return 'Error al consultar información en tiempo real.';
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
    if (dbContext && dbContext.includes('Paquetes turísticos disponibles')) {
      return `${dbContext}\n\n¿Te interesa alguno de estos paquetes? Puedo darte más detalles.`;
    }
    
    if (q.includes('precio') || q.includes('costo') || q.includes('paquete')) {
      return 'Puedo mostrarte nuestros paquetes disponibles. ¿Qué destino te interesa?';
    }
    if (q.includes('reserv') || q.includes('book')) {
      return 'Para reservar, necesitas crear una cuenta en nuestro sitio web. ¿Ya tienes cuenta?';
    }
    if (q.includes('pago') || q.includes('método')) {
      return 'Aceptamos pagos con tarjeta de crédito/débito, PayPal y transferencia bancaria.';
    }
    if (q.includes('hola') || q.includes('hi') || q.includes('buenos')) {
      return '¡Hola! Soy el asistente de BrightTour. Puedo ayudarte con paquetes turísticos, reservas y pagos. ¿En qué te puedo ayudar?';
    }
    
    return 'Soy tu asistente BrightTour. Puedo ayudarte con paquetes turísticos, reservas y pagos. ¿Qué te gustaría saber?';
  }
}

