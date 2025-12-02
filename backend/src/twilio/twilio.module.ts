import { Module } from '@nestjs/common';
import { TwilioController } from './twilio.controller';
import { ChatbotModule } from '../chatbot/chatbot.module';

@Module({
  imports: [ChatbotModule],
  controllers: [TwilioController],
})
export class TwilioModule {}

