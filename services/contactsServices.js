import { Contact } from '../models/contact.js';

async function listContacts(ownerId) {
  return Contact.findAll({
    where: { owner: ownerId },
    order: [['id', 'ASC']],
  });
}

async function getContactById(ownerId, contactId) {
  return Contact.findOne({
    where: { id: contactId, owner: ownerId },
  });
}

async function addContact(ownerId, data) {
  return Contact.create({ ...data, owner: ownerId });
}

async function updateContact(ownerId, contactId, data) {
  const [count, [updated]] = await Contact.update(data, {
    where: { id: contactId, owner: ownerId },
    returning: true,
  });
  return count ? updated : null;
}

async function removeContact(ownerId, contactId) {
  const item = await Contact.findOne({
    where: { id: contactId, owner: ownerId },
  });
  if (!item) return null;
  await item.destroy();
  return item;
}

async function updateFavorite(ownerId, contactId, favorite) {
  const [count, [updated]] = await Contact.update(
    { favorite },
    {
      where: { id: contactId, owner: ownerId },
      returning: true,
    }
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
