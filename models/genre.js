const Joi = require("joi");

const mongoose = require("mongoose");

// defining schema
const Genres = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// creating model

const Genre = mongoose.model("Genres", Genres);

// defining schemavalidator
function schemaValid(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.validate = schemaValid;
