import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).max(128).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).max(128).required(),
});

export default { registerSchema, loginSchema };
