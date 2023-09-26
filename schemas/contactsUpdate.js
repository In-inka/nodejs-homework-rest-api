const Joi = require("joi");

const addSchemaUpdate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
    .messages({ "string.pattern.base": `Phone number form (097)-000-0000` })
    .required(),
}).messages({ "any.required": "missing fields" });

module.exports = addSchemaUpdate;
