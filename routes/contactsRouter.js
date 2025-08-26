import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getOneContact);
router.delete('/:id', deleteContact);
router.post('/', validateBody(createContactSchema), createContact);
router.put('/:id', validateBody(updateContactSchema), updateContact);

export default router;
