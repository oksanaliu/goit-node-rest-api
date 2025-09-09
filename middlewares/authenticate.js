import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await User.findByPk(payload.id);

    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      subscription: user.subscription,
    };

    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
