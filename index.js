const express = require("express");
const Joi = require("joi");
const genres = require("./routes/genres");

const app = express();
app.use(express.json());
// listening to port
const port = 3001;
app.listen(port, () => console.log(`listening to port`));

app.get("/", (req, res) => {
  res.send("this is genre homepage");
});
app.use("/genres", genres);
