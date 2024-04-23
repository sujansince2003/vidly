const mongoose = require("mongoose");
const Joi = require("joi");
const Customers = new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("customers", Customers);

function schemaValid(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().required(),
  });
  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = schemaValid;
