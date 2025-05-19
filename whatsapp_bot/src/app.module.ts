import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { ConfigModule } from '@nestjs/config';
import { WhatsappService } from './whatsapp/whatsapp.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, WhatsappController],
  providers: [AppService, WhatsappService],
})
export class AppModule {}
