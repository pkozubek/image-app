const HttpError = require("../models/httpError");
const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const Image = require("../models/image");

const getImageById = async (req, res, next) => {
  const imageID = req.params.id;
  let gatheredImage;

  try {
    gatheredImage = await Image.findById(imageID);
    console.log("gat", gatheredImage, imageID);
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
  let gatheredImage;

  try {
    gatheredImage = await Image.find({ userID: userID });
  } catch (error) {
    return next(error);
  }

  if (gatheredImage.length === 0) {
    const error = new HttpError(" No images for user", 404);
    return next(error);
  }

  res.status(200).json({
    images: gatheredImage.map(singleImage =>
      singleImage.toObject({ getters: true })
    )
  });
};

const createImage = async (req, res, next) => {
  const { name, url, description, author } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new HttpError("bledne dane", 400);
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
    await createdImage.save();
  } catch (err) {
    return next(err);
  }

  res.status(200).json(createdImage);
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
    deletedImage = await Image.findById(id);
  } catch (error) {
    return next(error);
  }

  try {
    await deletedImage.remove();
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
