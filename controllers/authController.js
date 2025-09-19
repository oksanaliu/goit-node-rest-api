import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import fs from 'fs/promises';
import path from 'path';

import {
  findUserByEmail,
  findUserById,
  createUser,
  setUserToken,
  clearUserToken,
  updateUserAvatar,
} from '../services/authService.js';

const { JWT_SECRET, JWT_EXPIRES_IN = '23h' } = process.env;
const avatarsDir = path.join(process.cwd(), 'public', 'avatars');

export const register = async (req, res, next) => {
  try {
    const email = String(req.body.email || '')
      .trim()
      .toLowerCase();
    const { password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: 'Email in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);

    const newUser = await createUser({
      email,
      password: hashedPassword,
      subscription: 'starter',
      avatarURL,
    });

    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const email = String(req.body.email || '')
      .trim()
      .toLowerCase();
    const { password } = req.body;

    const user = await findUserByEmail(email);
    if (!user)
      return res.status(401).json({ message: 'Email or password is wrong' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(401).json({ message: 'Email or password is wrong' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await setUserToken(user.id, token);

    return res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return res.status(401).json({ message: 'Not authorized' });

    await clearUserToken(user.id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    return res.status(200).json({ email, subscription });
  } catch (err) {
    next(err);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: 'Avatar file is required' });

    const { id } = req.user;
    const { path: tempPath, originalname } = req.file;

    const filename = `${id}_${originalname}`;
    const finalPath = path.join(avatarsDir, filename);

    await fs.rename(tempPath, finalPath);

    const avatarURL = `/avatars/${filename}`;
    const ok = await updateUserAvatar(id, avatarURL);
    if (!ok) return res.status(401).json({ message: 'Not authorized' });

    return res.status(200).json({ avatarURL });
  } catch (err) {
    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch {}
    }
    next(err);
  }
};

export default { register, login, logout, getCurrent, updateAvatar };
