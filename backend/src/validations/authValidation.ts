import Joi, { Schema, StringSchema } from 'joi';

// Define reusable schemas
const nameSchema: StringSchema = Joi.string().alphanum().min(3).max(30).required().messages({
  'string.alphanum': '{{#label}} must only contain alpha-numeric characters',
  'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
  "any.required": "{{#label}} is required!!",
  "string.empty": "{{#label}} can't be empty!!",
});

const emailSchema: StringSchema = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
  'string.domain': '{{#label}} must contain a valid domain name',
  'string.email': '{{#label}} must be a valid email',
});

const passwordSchema: StringSchema = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).message('{{#label}} with value {:[.]} fails to match the {{#name}} pattern');

// Define register schema using reusable schemas
const registerSchema: Schema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: Joi.string().valid('Employee', 'Admin', 'SuperAdmin').default('Employee'),
  status: Joi.string().valid('Pending', 'Active', 'Inactive').default('Pending'),
});

const loginSchema: Schema = Joi.object({
  email: emailSchema,
  password: passwordSchema
});

export { registerSchema, loginSchema };
