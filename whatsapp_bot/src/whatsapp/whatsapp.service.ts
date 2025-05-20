import { Injectable, Logger } from '@nestjs/common';
import { AppConfig } from 'src/config/AppConfig';
import { OpenaiService } from 'src/openai/openai.service';
const axios = require('axios');

@Injectable()
export class WhatsappService {
    private readonly logger = new Logger(WhatsappService.name);
    constructor(private openaiService: OpenaiService) {}

    async handleUserMessage(number: string, message: string) {
        try{
            const reply = await this.openaiService.generateOpenAIResponse(message);
            this.sendMessage(number, reply);
        }catch(e){
            this.logger.error("Error in handling user message", e);
            this.sendMessage(number, "Sorry, I could not process your request.");
        }
       
    }

  async sendMessage(to: string, message: string) {
    let data = JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'text',
      text: {
        preview_url: false,
        body: message,
      },
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://graph.facebook.com/${AppConfig.WHATSAPP_API_VERSION}/${AppConfig.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AppConfig.WHATSAPP_API_KEY}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}