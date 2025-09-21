import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

const User = sequelize.define(
  'user',
  {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    subscription: {
      type: DataTypes.ENUM('starter', 'pro', 'business'),
      defaultValue: 'starter',
    },
    token: { type: DataTypes.STRING, defaultValue: null },
    avatarURL: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
