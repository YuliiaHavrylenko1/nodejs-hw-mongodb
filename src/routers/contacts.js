import express from 'express';
import {
  getAllContactsCtrl,
  getContactByIdCtrl,
  createContactCtrl,
  updateContactCtrl,
  deleteContactCtrl,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validations/contactSchemas.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContactsCtrl));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdCtrl));

router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactCtrl));

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactCtrl)
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactCtrl));

export default router;
