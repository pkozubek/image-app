import HttpError from "../models/httpError";
import { validationResult } from "express-validator";
import User from "../models/user";

export const getUsersData = async (req, res) => {
  const users = await User.find({}, "-password").populate("images");
  res.json(users.map((user) => user.toObject({ getters: true })));
};

export const getUserData = async (req, res, next) => {
  const userID = req.params.id;
  let existingUser;
  try {
    existingUser = await User.findOne({ _id: userID }, "-password");
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }

  if (existingUser.length === 0) {
    return next(new HttpError("User doesnt exist", 404));
  }
  res.json({
    user: existingUser.toObject({ getters: true }),
  });
};

export const loginUser = async (req, res, next) => {
  const body = req.body;
  const { name, password } = body;

  let existingUser;
  try {
    existingUser = await User.findOne({ name, password });
  } catch (error) {
    return next(new HttpError("Something went wrong", 401));
  }

  if (!existingUser) {
    return next(new HttpError("Wrong name, password combination", 401));
  }

  res.status(200).json({ message: "Login correct" });
};

export const registerUser = async (req, res, next) => {
  const body = req.body;
  const { name, email, password } = body;
  const errors = validationResult(req);
  let newUser;
  if (errors.isEmpty()) {
    let registeredUser;
    try {
      registeredUser = await User.findOne({ email: email });
    } catch (error) {
      return next(new HttpError("Register incomplete", 400));
    }
    if (registeredUser) return next(new HttpError("User already exist", 400));

    newUser = new User({
      name,
      email,
      password,
      images: [],
    });

    try {
      await newUser.save();
    } catch (error) {
      return next(new HttpError("Register incomplete", 400));
    }
  } else {
    return next(new HttpError("Wrong register data", 400));
  }

  res.status(200).json({ user: newUser.toObject() });
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, password, email } = req.body;
  const errors = validationResult(req);

  let updatedUser;
  if (errors.isEmpty()) {
    updatedUser = await User.findById(id);
  } else {
    return next(new HttpError("Wrong data", 400));
  }

  if (updateUser) {
    updatedUser.name = name;
    updatedUser.password = password;
    updatedUser.email = email;
  } else {
    return next(new HttpError("User does not exist", 400));
  }

  res.status(200).json(updateUser);
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return next(new HttpError("Something went wrong", 400));
  }

  await user.remove();
  res.json("user deleted");
};
