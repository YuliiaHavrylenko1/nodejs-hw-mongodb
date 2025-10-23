// src/services/contacts.js

import Contact from '../models/contact.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return {
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  };
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return {
      status: 404,
      message: 'Contact not found',
    };
  }
  return {
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  };
};

export const createContact = async (data) => {
  const contact = new Contact(data);
  const savedContact = await contact.save();
  return {
    status: 201,
    message: 'Successfully created a contact!',
    data: savedContact.toObject(), // ✅ тепер без __v
  };
};

export const updateContact = async (contactId, updateData) => {
  const updated = await Contact.findByIdAndUpdate(contactId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updated) {
    return { status: 404, message: 'Contact not found' };
  }
  return {
    status: 200,
    message: 'Successfully patched a contact!',
    data: updated.toObject(), // ✅ також при оновленні
  };
};

export const deleteContact = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    return { status: 404, message: 'Contact not found' };
  }
  return {
    status: 204,
    message: 'Successfully deleted contact',
  };
};
