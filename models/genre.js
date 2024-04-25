const Joi = require("joi");

const mongoose = require("mongoose");

// defining schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// creating model

const Genre = mongoose.model("Genres", genreSchema);

// defining schemavalidator
function schemaValid(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = schemaValid;
