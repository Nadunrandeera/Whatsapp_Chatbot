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
    if (mode === "subscribe" && token === '123456789') {
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
        console.log('Received webhook:', JSON.stringify(req.body.entry));
        res.sendStatus(200); // Respond with 200 OK
    }

}
