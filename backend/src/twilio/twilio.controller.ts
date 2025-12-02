import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { ChatbotService } from '../chatbot/chatbot.service';

@Controller('webhooks/twilio-whatsapp')
export class TwilioController {
  constructor(private readonly chatbot: ChatbotService) {}

  @Post()
  @HttpCode(200)
  async receive(
    @Body() body: any,
    @Headers('x-twilio-signature') _sig?: string,
  ) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'; // sandbox default

    const incomingText: string = (body?.Body || '').trim();
    const from: string = body?.From; // e.g., 'whatsapp:+1234567890'

    if (!incomingText || !from) return { status: 'ignored' };

    const answer = await this.chatbot.generateReply(incomingText, { source: 'whatsapp', userId: from });

    if (!accountSid || !authToken) return { status: 'ok-no-send' };

    const params = new URLSearchParams();
    params.set('From', fromNumber);
    params.set('To', from);
    params.set('Body', answer);

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const creds = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${creds}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    return { status: 'ok' };
  }
}

