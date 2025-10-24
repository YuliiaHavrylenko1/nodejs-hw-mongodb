import Contact from '../models/contact.js';

export const getAllContacts = async (query = {}) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = query;

  const filter = {};
  if (type) filter.contactType = type;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

  const skip = (page - 1) * perPage;

  const totalItems = await Contact.countDocuments(filter);

  const contacts = await Contact.find(filter)
    .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
    .skip(skip)
    .limit(Number(perPage));

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
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
    data: savedContact.toObject(),
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
    data: updated.toObject(),
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
