import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ChatbotService } from '../chatbot/chatbot.service';

interface TelegramUpdate {
  update_id?: number;
  message?: {
    message_id?: number;
    chat?: { id: number };
    text?: string;
  };
}

@Controller('webhooks/telegram')
export class TelegramController {
  constructor(private readonly chatbot: ChatbotService) {}

  @Post()
  @HttpCode(200)
  async receive(@Body() update: TelegramUpdate) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const msg = update?.message;
    const chatId = msg?.chat?.id;
    const text = (msg?.text || '').trim();

    if (!token || !chatId || !text) {
      return { status: 'ignored' };
    }

    const answer = await this.chatbot.generateReply(text, { source: 'web' });

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: answer }),
    });

    return { status: 'ok' };
  }
}

