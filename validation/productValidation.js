const Joi = require("joi");

const productNameRole = {
  productName: Joi.string().min(2).max(50).trim().required(),
};
const productPriceRole = {
  productPrice: Joi.number().min(0).max(10000).required(),
};

const emailRole = {
  email: Joi.string().email().min(6).max(255).trim().required(),
};

const productsSchema = Joi.object({
  ...productNameRole,
  ...productPriceRole,
  ...emailRole,
});

const validateProductSchema = (data) => {
  return productsSchema.validateAsync(data, { abortEarly: false });
};

module.exports = { validateProductSchema };
