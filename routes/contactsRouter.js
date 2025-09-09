import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from '../controllers/contactsControllers.js';

import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../schemas/contactsSchemas.js';

import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);
router.get('/', getAllContacts);
router.get('/:id', getOneContact);
router.post('/', validateBody(createContactSchema), createContact);
router.put('/:id', validateBody(updateContactSchema), updateContact);

router.patch(
  '/:id/favorite',
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

router.delete('/:id', deleteContact);

export default router;
