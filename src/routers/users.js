import { Router } from 'express';
import { userController } from '../controllers/index.js';
import { loginWithGoogleController } from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  loginWithGoogleOAuthSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
const router = Router();

router.get(
  '/get-oauth-url',
  ctrlWrapper(userController.getGoogleOAuthUrlController),
);
router.post(
  '/confirm-google-auth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);
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
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(userController.requestResetEmailController),
);
router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(userController.resetPasswordController),
);
router.post(
  '/refresh',
  ctrlWrapper(userController.refreshUserSessionController),
);
router.post('/logout', ctrlWrapper(userController.logoutUserController));

export default router;
