import express, { NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";

import imagesRoutes from "./routes/images";
import usersRoutes from "./routes/users";
import HttpError from "./models/httpError";

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/images", imagesRoutes);
app.use("/api/users/", usersRoutes);
app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next: NextFunction) => {
  throw new HttpError("this route does not exist", 404);
});

app.use((error, req, res, next: NextFunction) => {
  if (res.headerSent) {
    next();
  }
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
  .catch((error) => {
    console.error(error);
  });
