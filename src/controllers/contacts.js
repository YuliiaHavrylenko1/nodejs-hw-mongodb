import Contact from '../models/contact.js';
import createHttpError from 'http-errors';


export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ userId: req.user._id });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};


export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.contactId, userId: req.user._id });
    if (!contact) throw createHttpError(404, "Contact not found");
    res.json(contact);
  } catch (error) {
    next(error);
  }
};


export const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.contactId, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!contact) throw createHttpError(404, "Contact not found");
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.contactId,
      userId: req.user._id,
    });
    if (!contact) throw createHttpError(404, "Contact not found");
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
