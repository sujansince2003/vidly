const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

// connect to mongodb

mongoose
  .connect("mongodb://127.0.0.1:27017/rentvid")
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log("Failed connection"));

const app = express();
app.use(express.json());
// listening to port
const port = 3001;
app.listen(port, () => console.log(`listening to port`));

app.get("/", (req, res) => {
  res.send("this is genre homepage");
});
app.use("/genres", genres);
app.use("/customers", customers);
