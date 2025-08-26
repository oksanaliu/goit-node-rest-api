import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const contactsPath = path.join(__dirname, '..', 'db', 'contacts.json');

async function readContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8').catch(() => '[]');
  return JSON.parse(data || '[]');
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function listContacts() {
  return await readContacts();
}

export async function getContactById(contactId) {
  const contacts = await readContacts();
  return contacts.find((c) => String(c.id) === String(contactId)) || null;
}

export async function removeContact(contactId) {
  const contacts = await readContacts();
  const idx = contacts.findIndex((c) => String(c.id) === String(contactId));
  if (idx === -1) return null;
  const [removed] = contacts.splice(idx, 1);
  await writeContacts(contacts);
  return removed;
}

export async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

export async function updateContact(contactId, data) {
  const contacts = await readContacts();
  const idx = contacts.findIndex((c) => String(c.id) === String(contactId));
  if (idx === -1) return null;
  const current = contacts[idx];
  const updated = { ...current, ...data, id: current.id };
  contacts[idx] = updated;
  await writeContacts(contacts);
  return updated;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactsPath,
};
