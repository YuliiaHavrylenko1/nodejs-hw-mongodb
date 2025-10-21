
import express from 'express';
import cors from 'cors';
import pino from 'pino';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import contactsRouter from './routers/contacts.js';

const logger = pino();

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());


  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });


  app.use('/contacts', contactsRouter);


  app.use(notFoundHandler);


  app.use(errorHandler);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
