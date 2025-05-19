import { Controller, Get, Post, Req, Res } from '@nestjs/common';

@Controller('whatsapp')
export class WhatsappController {
    @Get('test')
    test(){
        return 'nadun';
    }
    @Get('webhook')//verify the endpoint
    challengeWebhook(@Req() req, @Res() res) {
        let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === process.env.WHATSAPP_CHALLANGE_KEY) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
    }
    @Post('webhook')
    handleWebhook(@Req() req, @Res() res) {

        const payload = req.body.entry;
        const change = payload[0].changes[0].value;
        const senderNumber = change.contacts[0].wa_id;
        const messageText = change.messages[0].text.body;
        const senderName = change.contacts[0].profile.name;

        console.log('Sender Number:', senderNumber);
        console.log('Message:', messageText);
        console.log('Sender Name:', senderName);
        this.sendMessage(senderNumber,"Hello, this is a test message from the server!");
        
        res.sendStatus(200);
        
         // Respond with 200 OK
    }

    async sendMessage(to: string, message: string) {
      const axios = require('axios');
      let data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "+94710763969",
        "type": "text",
        "text": {
          "preview_url": false,
          "body": message
        }
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://graph.facebook.com/${process.env.WHATSAPP_API_vERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`,
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    }

}
