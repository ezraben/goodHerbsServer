const Joi = require("joi");

const firstNameRole = {
  firstName: Joi.string().min(2).max(255).trim().alphanum().required(),
};
const lastNameRole = {
  lastName: Joi.string().min(2).max(255).trim().alphanum().required(),
};

const emailRole = {
  email: Joi.string().email().min(6).max(255).trim().required(),
};
const passwordRole = {
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
};

const isAdminRole = {
  isAdmin: Joi.boolean().required(),
};

const signUpSchema = Joi.object({
  ...firstNameRole,
  ...lastNameRole,
  ...emailRole,
  ...passwordRole,
  ...isAdminRole,
});

const loginSchema = Joi.object({
  ...emailRole,
  ...passwordRole,
});

const validateSignUpSchema = (data) => {
  return signUpSchema.validateAsync(data, { abortEarly: false });
};

const validateLoginSchema = (data) => {
  return loginSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateSignUpSchema,
  validateLoginSchema,
};
