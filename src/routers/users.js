import { Router } from 'express';
import { loginUserSchema, registerUserSchema } from '../../validation/auth.js';
import { userController } from '../controllers/index.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(userController.registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(userController.loginUserController),
);
router.post(
  '/refresh',
  ctrlWrapper(userController.refreshUserSessionController),
);
router.post('/logout', ctrlWrapper(userController.logoutUserController));

export default router;
