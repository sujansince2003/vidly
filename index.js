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
app.use(express.json());
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

// adding genre

// defining schemavalidator
function schemaValid(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

app.post("/genres", (req, res) => {
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
app.put("/genres/:gid", (req, res) => {
  const newgenre = genres.find((g) => g.id === parseInt(req.params.gid));
  if (!newgenre) return res.status(404).send("Genre not availabe with that ID");

  const { error } = schemaValid(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  newgenre.name = req.body.name;
  res.send(newgenre);
});

// handling delete request

app.delete("/genres/:gid", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.gid));
  if (!genre) return res.status(404).send("Genre not availabe with that ID");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});
