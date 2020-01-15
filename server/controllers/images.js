const HttpError = require("../models/httpError");
const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

let DUMMY_DATA = [
  {
    id: 1,
    name: "test",
    url: "test.pl",
    description: "trala",
    views: 1,
    likes: 10,
    userID: 1
  },
  {
    id: 2,
    name: "test2",
    url: "test2.pl",
    description: "trala",
    views: 1,
    likes: 10,
    userID: 1
  },
  {
    id: 3,
    name: "test3",
    url: "test3.pl",
    description: "trala",
    views: 1,
    likes: 10,
    userID: 2
  }
];

const getImageById = (req, res, next) => {
  const imageID = req.params.id;
  const findImage = DUMMY_DATA.find(image => {
    return Number(image.id) === Number(imageID);
  });

  if (!findImage) {
    const error = new HttpError(`No images with ${imageID} id`, 404);
    return next(error);
  }

  res.json({ image: findImage });
};

const getUserImages = (req, res, next) => {
  const userID = req.params.id;
  const findImages = DUMMY_DATA.filter(image => {
    return Number(image.userID) === Number(userID);
  });
  if (findImages.length === 0) {
    const error = new HttpError(" No images for user", 404);
    return next(error);
  }

  res.status(200).json({ images: findImages });
};

const createImage = (req, res) => {
  const { title, url, description, author } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    DUMMY_DATA.push({
      id: uuid(),
      name: title,
      description: "test",
      url: url,
      views: 0,
      likes: 0,
      userID: author
    });
  } else {
    throw new HttpError("bledne dane", 400);
  }

  res.status(200).json(DUMMY_DATA);
};

const updateImage = (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const updateImageData = { ...DUMMY_DATA.find(row => row.id == id) };
    const imageIndex = DUMMY_DATA.findIndex(row => row.id == id);
    updateImageData.name = title;
    updateImageData.description = description;
    DUMMY_DATA[imageIndex] = updateImageData;
  } else {
    throw new HttpError("bledne dane", 400);
  }

  res.status(200).json(DUMMY_DATA);
};

const deleteImage = (req, res) => {
  const id = req.params.id;
  DUMMY_DATA = DUMMY_DATA.filter(row => row.id != id);

  res.status(200).json(DUMMY_DATA);
};

module.exports = {
  getImageById,
  getUserImages,
  createImage,
  updateImage,
  deleteImage
};
