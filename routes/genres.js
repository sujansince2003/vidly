const Joi = require("joi");
const express = require("express");

const router = express.Router();

const { Genre, validate } = require("../models/genre");
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

router.get("/:gid", async (req, res) => {
  const genre = await Genre.findById(req.params.gid);
  // const genre = genres.find((g) => g.id === parseInt(req.params.gid));

  genre
    ? res.send(genre)
    : res.status(404).send("Genre is not found with this ID");
});

// adding genre

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});

// handling put request for updating the genre
router.put("/:gid", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.gid,
    { name: req.body.name },
    { new: true }
  );

  // const newgenre = genres.find((g) => g.id === parseInt(req.params.gid));
  if (!genre) return res.status(404).send("Genre not availabe with that ID");

  // newgenre.name = req.body.name;
  res.send(genre);
});

// handling delete request

router.delete("/:gid", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.gid);
  // const genre = genres.find((g) => g.id === parseInt(req.params.gid));
  if (!genre) return res.status(404).send("Genre not availabe with that ID");
  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);
  res.send(genre);
});

module.exports = router;
