import HttpError from './HttpError.js';

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((e) => e.message);
      return next(HttpError(400, messages.join(', ')));
    }

    next();
  };

  return func;
};

export default validateBody;
