import express from 'express';
import contactsRouter from './routers/contacts.js';
import usersRouter from './routers/users.js';

const app = express();


app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/contacts', contactsRouter);
app.use('/users', usersRouter);

export default app;
