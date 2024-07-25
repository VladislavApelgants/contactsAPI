import { Router } from 'express';
import {
  createContactShema,
  updateContactShema,
} from '../../validation/contacts.js';
import {
  createContactController,
  deleteContactByIdController,
  getAllContactsController,
  getContactByIdController,
  updateContactByIdController,
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  validateBody(createContactShema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/contacts/:id',
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);

router.patch(
  '/contacts/:id',
  isValidId,
  validateBody(updateContactShema),
  ctrlWrapper(updateContactByIdController),
);

export default router;
