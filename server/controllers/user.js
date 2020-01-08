const HttpError = require("../models/httpError");

const DUMMY_DATA = [
  {
    id: 1,
    name: "Justyna"
  }
];

const getUserData = (req, res, next) => {
  const userID = req.params.id;
  const findUser = DUMMY_DATA.find(image => {
    return Number(image.id) === Number(userID);
  });

  if (!findUser) {
    return new HttpError("Nie ma takiego uzytkownika", 404);
  }

  res.json({ user: findUser });
};

module.exports = { getUserData };
