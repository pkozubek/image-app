const HttpError = require("../models/httpError");
const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const Image = require("../models/image");
const User = require("../models/user");
const mongoose = require("mongoose");

const getImageById = async (req, res, next) => {
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

const getUserImages = async (req, res, next) => {
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
    images: user.images.map(singleImage =>
      singleImage.toObject({ getters: true })
    )
  });
};

const createImage = async (req, res, next) => {
  const { name, url, description, author } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError("Wrong data", 400));

  let existingUser;
  try {
    existingUser = await User.findById(author);
    if (!existingUser) return next(new HttpError("User doesnt exist"), 500);
  } catch (error) {
    return next(new HttpError("Something went wrong", 400));
  }

  const createdImage = new Image({
    id: uuid(),
    name,
    description,
    url,
    views: 1,
    likes: 1,
    userID: author
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

const updateImage = async (req, res, next) => {
  const id = req.params.id;
  const { name, description } = req.body;

  const errors = validationResult(req);
  let updatedImage;

  if (errors.isEmpty()) {
    try {
      updatedImage = await Image.findById(id);

      updatedImage.name = name;
      updatedImage.description = description;

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

const deleteImage = async (req, res, next) => {
  const id = req.params.id;

  let deletedImage;
  try {
    deletedImage = await Image.findById(id).populate("userID");
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
    return next(error);
  }

  res.status(200).json("Image deleted");
};

module.exports = {
  getImageById,
  getUserImages,
  createImage,
  updateImage,
  deleteImage
};
