import express from 'express';
import cors from 'cors';
import pino from 'pino';
import Contact from './models/contact.js';  
import { getAllContacts, getContactById } from './services/contacts.js';

const logger = pino();

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());


  app.get('/contacts', async (req, res) => {
    try {
      const response = await getAllContacts();
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });


  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const response = await getContactById(req.params.contactId);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  });


  app.post('/contacts', async (req, res) => {
    try {
      const contact = new Contact(req.body);
      const savedContact = await contact.save();
      res.status(201).json({
        status: 201,
        message: 'Contact successfully added!',
        data: savedContact,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  });

  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });


  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
