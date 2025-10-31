import express from 'express';
import cookieParser from 'cookie-parser';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);

app.use((req, res, next) => {
  notFoundHandler(req, res, next);
});



app.use(errorHandler);

export default app;
