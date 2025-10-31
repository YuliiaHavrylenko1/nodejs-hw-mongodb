import express from 'express';
import {
  getContacts,
  addContact,
  getContactById,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

router.use(authenticate); // ✅ захист усіх роутів

router.get('/', getContacts);
router.post('/', addContact);
router.get('/:contactId', isValidId, getContactById);
router.patch('/:contactId', isValidId, updateContact);
router.delete('/:contactId', isValidId, deleteContact);

export default router;
