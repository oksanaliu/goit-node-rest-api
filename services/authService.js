import User from '../models/User.js';

export const findUserByEmail = (email) => {
  return User.findOne({ where: { email } });
};

export const findUserById = (id) => {
  return User.findByPk(id);
};

export const createUser = (data) => {
  return User.create(data);
};

export const setUserToken = async (id, token) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.update({ token });
  return user;
};

export const clearUserToken = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.update({ token: null });
  return user;
};

export const updateUserAvatar = async (id, avatarURL) => {
  const [count] = await User.update({ avatarURL }, { where: { id } });
  return count > 0;
};
