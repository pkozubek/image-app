const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const uuid = require("uuid/v4");

const DUMMY_DATA = [
  {
    id: 1,
    name: "justyna",
    email: "mail@pl",
    password: "aaa"
  }
];

const getUserData = (req, res, next) => {
  const userID = req.params.id;
  const findUser = DUMMY_DATA.find(user => {
    return Number(user.id) === Number(userID);
  });

  if (!findUser) {
    throw new HttpError("Nie ma takiego uzytkownika", 404);
  }

  res.json({ user: findUser });
};

const loginUser = (req, res, next) => {
  const body = req.body;
  const { name, password } = body;

  const findUser = DUMMY_DATA.find(user => {
    return user.name == name && user.password == password;
  });

  if (!findUser) {
    throw new HttpError("Taka kombinacja nie istnieje", 401);
  }

  res.status(200).json({ message: "logged" });
};

const registerUser = (req, res, next) => {
  const body = req.body;
  const { name, email, password } = body;
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    DUMMY_DATA.push({
      id: uuid(),
      name,
      email,
      password
    });
  } else {
    throw new HttpError("Bledne dane rejestracji", 400);
  }

  res.status(200).json({ message: DUMMY_DATA });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, password, email } = req.body;
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const updatedUser = { ...DUMMY_DATA.find(row => row.id == id) };
    const userArrayIndex = DUMMY_DATA.findIndex(row => row.id == id);
    updatedUser.name = name;
    updatedUser.password = password;
    updatedUser.email = email;
    DUMMY_DATA[userArrayIndex] = updatedUser;
  } else {
    throw new HttpError("Bledne dane przy aktualizacji", 400);
  }

  res.status(200).json(DUMMY_DATA);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  DUMMY_DATA = DUMMY_DATA.filter(row => row.id != id);
  res.json(DUMMY_DATA);
};

module.exports = {
  getUserData,
  loginUser,
  registerUser,
  updateUser,
  deleteUser
};
