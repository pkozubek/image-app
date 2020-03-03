const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const imagesRoutes = require("./routes/images");
const usersRoutes = require("./routes/users");
const HttpError = require("./models/httpError");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/images", imagesRoutes);
app.use("/api/users/", usersRoutes);

app.use((req, res, next) => {
  throw new HttpError("this route does not exist", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    next();
  }
  console.log(res);
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("App listen");
    app.listen(4000);
  })
  .catch(error => {
    console.log(error);
  });
