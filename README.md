# WhatsApp OpenAI Chatbot

This project is a Node.js/NestJS-based chatbot that integrates WhatsApp messaging with OpenAI's GPT models. It allows users to send messages to a WhatsApp number and receive AI-generated responses.

## Features
- WhatsApp webhook integration for receiving and sending messages
- OpenAI GPT-3.5/4 integration for generating responses
- Modular NestJS structure for scalability
- Centralized configuration management

## Project Structure

```
whatsapp_bot/
├── src/
│   ├── config/
│   │   └── AppConfig.ts         # Application configuration (API keys, version, etc.)
│   ├── openai/
│   │   ├── openai.service.ts    # OpenAI API integration logic
│   │   └── openai.service.spec.ts
│   ├── whatsapp/
│   │   ├── whatsapp.controller.ts # Handles WhatsApp webhook endpoints
│   │   ├── whatsapp.service.ts    # WhatsApp business API and message handling
│   │   └── whats-app.service.spec.ts
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
├── eslint.config.mjs
└── test/
    ├── app.e2e-spec.ts
    └── jest-e2e.json
```

## Setup

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Configure environment variables**
   - Set your WhatsApp API keys, phone number ID, and OpenAI API key in `src/config/AppConfig.ts` or using environment variables as referenced in the code.

   ### Sample `.env` file
   ```env
   WHATSAPP_API_KEY=your_whatsapp_api_key_here
   WHATSAPP_API_VERSION=v19.0
   WHATSAPP_PHONE_NUMBER_ID=123456789012345
   WHATSAPP_CHALLANGE_KEY=your_webhook_verify_token
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. **Run the application**
   ```sh
   npm run start:dev
   ```

4. **Expose your webhook endpoint**
   - Use a service like [ngrok](https://ngrok.com/) to expose your local server to the internet for WhatsApp webhook verification.

## WhatsApp Webhook Endpoints
- `GET /whatsapp/webhook` - For webhook verification
- `POST /whatsapp/webhook` - For receiving messages

## OpenAI Integration
- The `OpenaiService` handles all OpenAI API calls.
- The `WhatsappService` delegates user message processing to OpenAI and sends the response back to the user.

## Testing
- Unit and integration tests are located in the `src/openai/` and `src/whatsapp/` directories and the `test/` folder.

## Dependencies
See `package.json` for a full list. Key dependencies include:
- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`
- `openai`
- `axios`

## License
MIT
