const express = require("express");
const Joi = require("joi");

const app = express();

// listening to port
const port = 3001;
app.listen(port, () => console.log(`listening to port`));

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

app.get("/", (req, res) => {
  res.send("this is genre homepage");
});

app.get("/genres", (req, res) => {
  res.send(genres);
});

app.get("/genres/:gid", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.gid));

  genre
    ? res.send(genre)
    : res.status(404).send("Genre is not found with this ID");
});
