import { Router } from 'express';
import { contactController } from '../controllers/index.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactShema,
  updateContactShema,
} from '../validation/contacts.js';

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
  upload.single('photo'),
  validateBody(createContactShema),
  ctrlWrapper(contactController.createContactController),
);

router.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactShema),
  ctrlWrapper(contactController.updateContactByIdController),
);

router.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactController.deleteContactByIdController),
);

export default router;
