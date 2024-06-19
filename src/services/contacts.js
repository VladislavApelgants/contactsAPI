import { Contact } from '../db/models/contact.js';

export async function getAllContacts() {
  return await Contact.find();
}

export async function getContactById(id) {
  return await Contact.findOne({ _id: id });
}

export async function createContact(payload) {
  return await Contact.create(payload);
}

export async function deleteContact(id) {
  return await Contact.findByIdAndDelete(id);
}

export async function updateContact(id, payload) {
  return await Contact.findByIdAndUpdate(id, payload);
}
