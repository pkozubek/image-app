import HttpError from "../models/httpError";
import uuid from "uuid/v4";
import { validationResult } from "express-validator";
import Image from "../models/image";
import User from "../models/user";
import mongoose from "mongoose";
import { NextFunction } from "express";

export const getAllImages = async (req, res) => {
  const images = await Image.find({}).populate("userID", "name id");
  res
    .status(200)
    .json(images.map((image) => image.toObject({ getters: true })));
};

export const getImageById = async (req, res, next: NextFunction) => {
  const imageID = req.params.id;
  let gatheredImage;

  try {
    gatheredImage = await Image.findById(imageID);
  } catch (error) {
    return next(error);
  }

  if (!gatheredImage) {
    const error = new HttpError(`No images with ${imageID} id`, 404);
    return next(error);
  }

  res.json({ image: gatheredImage.toObject({ getters: true }) });
};

export const getUserImages = async (req, res, next: NextFunction) => {
  const userID = req.params.id;

  let user;
  try {
    user = await User.findById(userID).populate("images");
  } catch (error) {
    return next(new HttpError(error, 400));
  }

  if (user.images === 0) {
    const error = new HttpError(" No images for user", 404);
    return next(error);
  }

  res.status(200).json({
    images: user.images.map((singleImage) =>
      singleImage.toObject({ getters: true })
    ),
  });
};

export const createImage = async (req, res, next: NextFunction) => {
  const { name, description, author } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError("Wrong data", 400));

  let existingUser;
  try {
    existingUser = await User.findById(author);
    if (!existingUser) return next(new HttpError("User doesnt exist", 500));
  } catch (error) {
    return next(new HttpError("Something went wrong", 400));
  }

  const createdImage = new Image({
    id: uuid(),
    name,
    description,
    url: `${req.protocol}://${req.headers.host}/${req.file.path}`,
    views: 1,
    likes: 1,
    userID: author,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdImage.save({ session: session });
    existingUser.images.push(createdImage);
    await existingUser.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ id: createdImage.id });
};

export const updateImage = async (req, res, next: NextFunction) => {
  const id = req.params.id;
  const { name, description } = req.body;

  const errors = validationResult(req);
  let updatedImage;

  if (errors.isEmpty()) {
    try {
      updatedImage = await Image.findById(id);
      if (req.userData.userID && req.userData.userID !== updatedImage.userID)
        return next(new HttpError("Can not update not your image", 400));

      if (name) updatedImage.name = name;
      if (description) updatedImage.description = description;

      try {
        await updatedImage.save();
      } catch (error) {
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
  } else {
    return next(new HttpError("Wrong data, change and try again", 400));
  }

  res.status(200).json(updatedImage.toObject({ getters: true }));
};

export const addView = async (req, res, next: NextFunction) => {
  const id = req.params.id;
  let updatedImage: any = await Image.findById(id);
  if (!updateImage) return next(new HttpError("Image does not exist", 400));

  updatedImage.views += 1;
  try {
    await updatedImage.save();
  } catch (error) {
    return next(error);
  }

  res.status(200).json({});
};

export const deleteImage = async (req, res, next) => {
  const id = req.params.id;

  let deletedImage;
  try {
    deletedImage = await Image.findById(id).populate("userID");

    if (req.userData.userID != deletedImage.userID._id)
      return next(new HttpError("Can not delete your image", 400));
  } catch (error) {
    return next(error);
  }

  if (!deletedImage) return next(new HttpError("Image does not exist", 500));

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    deletedImage.userID.images.pull(deletedImage);
    await deletedImage.userID.save({ session: session });
    await deletedImage.remove({ session: session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  res.status(200).json("Image deleted");
};
