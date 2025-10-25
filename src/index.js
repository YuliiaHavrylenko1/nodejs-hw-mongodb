import dotenv from 'dotenv';
dotenv.config();

import app from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await initMongoConnection();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
  }
};

start();
