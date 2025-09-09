import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const { JWT_SECRET, JWT_EXPIRES_IN = '23h' } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription: 'starter',
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await user.update({ token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await user.update({ token: null });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
  } catch (err) {
    next(err);
  }
};
