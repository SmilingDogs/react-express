const Joi = require('joi');
//* выносим Валидацию Joi отдельно чтобы не дублировать в разных местах.

function validateCustomer(customer) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });

  return schema.validate(customer);
}

module.exports.validateCustomer = validateCustomer;
