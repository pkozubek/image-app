const express = require("express");
const bodyParser = require("body-parser");
const imagesRoutes = require("./routes/images");
const usersRoutes = require("./routes/user");
const HttpError = require("./models/httpError");
const app = express();

app.use(bodyParser.json());
app.use("/api/images", imagesRoutes);
app.use("/api/users/", usersRoutes);
app.use((req, res, next) => {
  throw HttpError("this route does not exist", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    next();
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error" });
});
app.listen(4000);
