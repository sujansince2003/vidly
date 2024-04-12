const Joi = require("joi");
const express = require("express");
const router = express.Router();

// Dummy data for genres
const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Horror" },
  { id: 5, name: "Romance" },
  { id: 6, name: "Sci-Fi" },
  { id: 7, name: "Thriller" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:gid", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.gid));

  genre
    ? res.send(genre)
    : res.status(404).send("Genre is not found with this ID");
});

// adding genre

// defining schemavalidator
function schemaValid(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

router.post("/", (req, res) => {
  const { error } = schemaValid(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
  console.log(genres);
});

// handling put request for updating the genre
router.put("/:gid", (req, res) => {
  const newgenre = genres.find((g) => g.id === parseInt(req.params.gid));
  if (!newgenre) return res.status(404).send("Genre not availabe with that ID");

  const { error } = schemaValid(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  newgenre.name = req.body.name;
  res.send(newgenre);
});

// handling delete request

router.delete("/:gid", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.gid));
  if (!genre) return res.status(404).send("Genre not availabe with that ID");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

module.exports = router;
