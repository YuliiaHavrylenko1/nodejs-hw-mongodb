import express from 'express';
import {
  getAllContactsCtrl,
  getContactByIdCtrl,
  createContactCtrl,
  updateContactCtrl,
  deleteContactCtrl,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContactsCtrl));
router.get('/:contactId', ctrlWrapper(getContactByIdCtrl));
router.post('/', ctrlWrapper(createContactCtrl));
router.patch('/:contactId', ctrlWrapper(updateContactCtrl));
router.delete('/:contactId', ctrlWrapper(deleteContactCtrl));

export default router;
