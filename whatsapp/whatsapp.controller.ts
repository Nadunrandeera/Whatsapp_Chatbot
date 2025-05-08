import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('whatsapp')
export class WhatsappController {

    @Get('test')
    test(req: Request, res: Response) {
        res.send('nadun');
    }

    @Get('webhook') // <-- Add this to map the webhook verification
    challengeWebhook(req: Request, res: Response) {
        const mode = req.query["hub.mode"] as string;
        const token = req.query["hub.verify_token"] as string;
        const challenge = req.query["hub.challenge"] as string;

        if (mode && token) {
            if (mode === "subscribe" && token === '123456789') {
                console.log("WEBHOOK_VERIFIED");
                res.status(200).send(challenge);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(400);
        }
    }

}
