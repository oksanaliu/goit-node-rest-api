import express from 'express';
import {
  register,
  login,
  logout,
  getCurrent,
} from '../controllers/authController.js';
import validateBody from '../helpers/validateBody.js';
import { registerSchema, loginSchema } from '../schemas/authSchemas.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, getCurrent);

export default router;
