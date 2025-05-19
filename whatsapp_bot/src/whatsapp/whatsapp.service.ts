import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
const axios = require('axios');

@Injectable()
export class WhatsappService {
    constructor(private openaiService: OpenaiService) {}

    async handleUserMessage(number: string, message: string) {
       const reply = await this.openaiService.generateOpenAIResponse(message);
       this.sendMessage(number, reply);
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
      url: `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
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