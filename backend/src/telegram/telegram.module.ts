import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { ChatbotModule } from '../chatbot/chatbot.module';

@Module({
  imports: [ChatbotModule],
  controllers: [TelegramController],
})
export class TelegramModule {}

