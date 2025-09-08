import { Contact } from '../models/contact.js';

async function listContacts() {
  return Contact.findAll({ order: [['id', 'ASC']] });
}

async function getContactById(contactId) {
  return Contact.findByPk(contactId);
}

async function addContact(data) {
  return Contact.create(data);
}

async function updateContact(contactId, data) {
  const [count, [updated]] = await Contact.update(data, {
    where: { id: contactId },
    returning: true,
  });
  return count ? updated : null;
}

async function removeContact(contactId) {
  const count = await Contact.destroy({ where: { id: contactId } });
  return count > 0;
}

async function updateFavorite(contactId, favorite) {
  const [count, [updated]] = await Contact.update(
    { favorite },
    { where: { id: contactId }, returning: true }
  );
  return count ? updated : null;
}

export default {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
};
