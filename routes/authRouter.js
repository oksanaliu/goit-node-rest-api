import express from 'express';
import {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  verifyEmail,
  resendVerificationEmail,
} from '../controllers/authController.js';

import validateBody from '../helpers/validateBody.js';
import {
  registerSchema,
  loginSchema,
  resendEmailSchema,
} from '../schemas/authSchemas.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.get('/verify/:verificationToken', verifyEmail);

router.post(
  '/verify',
  validateBody(resendEmailSchema),
  resendVerificationEmail
);

router.post('/login', validateBody(loginSchema), login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, getCurrent);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

export default router;
