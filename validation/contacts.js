import Joi from 'joi';

export const createContactShema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'name should be a string',
    'string.min': 'name should have at least {#limit} characters',
    'string.max': 'name should have at most {#limit} characters',
    'any.required': 'name is required',
  }),
  phoneNumber: Joi.string().min(3).max(30).required().messages({
    'string.base': 'phoneNumber should be a string',
    'string.min': 'phoneNumber should have at least {#limit} characters',
    'string.max': 'phoneNumber should have at most {#limit} characters',
    'any.required': 'phoneNumber is required',
  }),
  email: Joi.string().min(3).max(30).email().messages({
    'string.base': 'email should be a string',
    'string.min': 'email should have at least {#limit} characters',
    'string.max': 'email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'email should be a boolean type (true or false)',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'contactType should be a string',
      'string.valid': 'contactType should have at least (work, home, personal)',
      'any.required': 'contactType is required',
    }),
});
export const updateContactShema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': 'name should be a string',
    'string.min': 'name should have at least {#limit} characters',
    'string.max': 'name should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(30).messages({
    'string.base': 'phoneNumber should be a string',
    'string.min': 'phoneNumber should have at least {#limit} characters',
    'string.max': 'phoneNumber should have at most {#limit} characters',
  }),
  email: Joi.string().min(3).max(30).email().messages({
    'string.base': 'email should be a string',
    'string.min': 'email should have at least {#limit} characters',
    'string.max': 'email should have at most {#limit} characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'email should be a boolean type (true or false)',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')

    .messages({
      'string.base': 'contactType should be a string',
      'string.valid': 'contactType should have at least (work, home, personal)',
    }),
});
