import contactsService from '../services/contactsServices.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const items = await contactsService.listContacts();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await contactsService.getContactById(id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await contactsService.removeContact(id);
    if (!removed) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(removed);
  } catch (err) {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const created = await contactsService.addContact(name, email, phone);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: 'Body must have at least one field' });
    }
    const { id } = req.params;
    const updated = await contactsService.updateContact(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
