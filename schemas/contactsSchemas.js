import Joi from 'joi';

const name = Joi.string().trim().min(1).max(100).messages({
  'string.base': 'name must be a string',
  'string.empty': 'name is required',
});

const email = Joi.string()
  .trim()
  .email({ tlds: { allow: false } })
  .messages({
    'string.email': 'email must be a valid email',
    'string.empty': 'email is required',
  });

const phone = Joi.string()
  .trim()
  .pattern(/^[0-9+()\-.\s]{3,30}$/)
  .messages({
    'string.pattern.base':
      'phone must contain only digits, spaces or symbols +()-.',
    'string.empty': 'phone is required',
  });

const favorite = Joi.boolean().messages({
  'boolean.base': 'favorite must be a boolean',
});

export const createContactSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  phone: phone.required(),
  favorite,
});

export const updateContactSchema = Joi.object({
  name,
  email,
  phone,
  favorite,
})
  .min(1)
  .messages({ 'object.min': 'Body must have at least one field' });
export const updateFavoriteSchema = Joi.object({
  favorite: favorite.required(),
}).messages({
  'any.required': 'missing field favorite',
});
export default { createContactSchema, updateContactSchema };
