import { Router } from 'express';
import {
  createContactShema,
  updateContactShema,
} from '../../validation/contacts.js';
import { contactController } from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.use(authenticate);
router.get('/', ctrlWrapper(contactController.getAllContactsController));

router.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactController.getContactByIdController),
);

router.post(
  '/',
  validateBody(createContactShema),
  ctrlWrapper(contactController.createContactController),
);
router.delete(
  '/:id',
  ctrlWrapper(contactController.deleteContactByIdController),
);

router.patch(
  '/:id',
  validateBody(updateContactShema),
  ctrlWrapper(contactController.updateContactByIdController),
);

export default router;
