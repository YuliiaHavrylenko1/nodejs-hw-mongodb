import 'dotenv/config';

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

console.log('Env vars:', {
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_DB: process.env.MONGODB_DB,
  PORT: process.env.PORT,
});

async function bootstrap() {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Failed to start app:', error);
    process.exit(1);
  }
}

bootstrap();
