import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export const getAllContactsCtrl = async (req, res) => {
  const response = await getAllContacts(req.query);
  res.status(response.status).json(response);
};

export const getContactByIdCtrl = async (req, res) => {
  const contactId = req.params.contactId;
  const response = await getContactById(contactId);

  if (response.status === 404) {
    throw createError(404, 'Contact not found');
  }

  res.status(response.status).json(response);
};

export const createContactCtrl = async (req, res) => {
  const response = await createContact(req.body);
  res.status(201).json(response);
};

export const updateContactCtrl = async (req, res) => {
  const contactId = req.params.contactId;
  const response = await updateContact(contactId, req.body);

  if (response.status === 404) {
    throw createError(404, 'Contact not found');
  }

  res.status(response.status).json(response);
};

export const deleteContactCtrl = async (req, res) => {
  const contactId = req.params.contactId;
  const response = await deleteContact(contactId);

  if (response.status === 404) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).end();
};
