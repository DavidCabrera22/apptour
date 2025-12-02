import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  HttpCode,
  Headers,
} from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

interface MetaWebhookBody {
  object?: string;
  entry?: any[];
}

@Controller('webhooks/meta')
export class ChatbotController {
  constructor(private readonly chatbot: ChatbotService) {}

  /**
   * Verificación del webhook de Meta (WhatsApp/Messenger/Instagram)
   */
  @Get()
  verify(@Query('hub.mode') mode: string, @Query('hub.verify_token') token: string, @Query('hub.challenge') challenge: string) {
    const verifyToken = process.env.META_VERIFY_TOKEN;
    if (mode === 'subscribe' && token === verifyToken) {
      return challenge;
    }
    return 'Error: token inválido';
  }

  /**
   * Recepción de mensajes y eventos. Procesa WhatsApp Cloud API y puede extenderse a Messenger/Instagram.
   */
  @Post()
  @HttpCode(200)
  async receive(@Body() body: MetaWebhookBody, @Headers('x-hub-signature') _signature?: string) {
    try {
      // WhatsApp Cloud API structure
      const entries = body?.entry || [];
      for (const entry of entries) {
        const changes = entry?.changes || [];
        for (const change of changes) {
          const value = change?.value;
          const messages = value?.messages || [];
          for (const msg of messages) {
            if (msg?.type === 'text' && msg?.text?.body) {
              const question: string = msg.text.body;
              const from: string = msg.from; // phone number
              const answer = await this.chatbot.generateReply(question, { source: 'whatsapp', userId: from });
              await this.sendWhatsAppText(from, answer);
            }
          }
        }
      }
    } catch (e) {
      // Log y devolver 200 para que Meta no reintente excesivamente
      // (NestJS logger no disponible aquí sin inyectar, omitir por simplicidad)
    }
    return { status: 'ok' };
  }

  private async sendWhatsAppText(to: string, text: string) {
    const token = process.env.META_ACCESS_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    if (!token || !phoneId) return;

    const url = `https://graph.facebook.com/v20.0/${phoneId}/messages`;
    const payload = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    };

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  }
}

