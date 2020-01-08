const HttpError = require("../models/httpError");
const uuuid = require("uuid/v4");
const DUMMY_DATA = [
  { id: 1, name: "test", url: "test.pl", views: 1, likes: 10, userID: 1 },
  { id: 2, name: "test2", url: "test2.pl", views: 1, likes: 10, userID: 1 },
  { id: 3, name: "test3", url: "test3.pl", views: 1, likes: 10, userID: 2 }
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
    console.log(Number(image.userID), "-", Number(userID));
    return Number(image.userID) === Number(userID);
  });
  if (findImages.length === 0) {
    const error = new HttpError(" No images for user", 404);
    return next(error);
  }

  res.status(200).json({ images: findImages });
};

const createImage = (req, res) => {
  const { title, description, author } = req.body;
  /*todo
    insert to database
  */
};

const updateImage = (req, res) => {
  const imageID = req.params.id;
  const { title, description, author } = req.body;
};

const deleteImage = (req, res) => {
  const imageID = req.params.id;
};

module.exports = {
  getImageById,
  getUserImages,
  createImage,
  updateImage,
  deleteImage
};
