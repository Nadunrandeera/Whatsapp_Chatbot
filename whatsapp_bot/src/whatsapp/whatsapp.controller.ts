import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {

  constructor(private whatsappService:WhatsappService) {}
  
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
    async handleWebhook(@Req() req, @Res() res) {

        const payload = req.body.entry;
        const change = payload[0].changes[0].value;
        const senderNumber = change.contacts[0].wa_id;
        const messageText = change.messages[0].text.body;
        const senderName = change.contacts[0].profile.name;

        console.log('Sender Number:', senderNumber);
        console.log('Message:', messageText);
        console.log('Sender Name:', senderName);
        await this.whatsappService.sendMessage(senderNumber, "Hello, this is a test message from the server!");
        
        res.sendStatus(200);
        
         // Respond with 200 OK
    }

}
