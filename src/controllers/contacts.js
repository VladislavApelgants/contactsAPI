import createHttpError from 'http-errors';
import { contactsServices } from '../services/index.js';

export const getAllContactsController = async (req, res) => {
  const contacts = await contactsServices.getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const contacts = await contactsServices.getContactById(req.params.id);

  if (!contacts) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const createContactController = async (req, res) => {
  const contact = await contactsServices.createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const contact = await contactsServices.deleteContact(req.params.id);

  if (!contact) throw createHttpError(404, 'Contact not found');

  res.status(204).send();
};

export const updateContactByIdController = async (req, res) => {
  const contact = await contactsServices.updateContact(req.params.id, req.body);

  if (!contact) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
