import HttpError from "../models/httpError";
import { validationResult } from "express-validator";
import User from "../models/user";
import { NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const loginUser = async (req, res, next: NextFunction) => {
  const body = req.body;
  const { name, password } = body;

  let existingUser;
  try {
    existingUser = await User.findOne({ name });
  } catch (error) {
    return next(new HttpError("Something went wrong", 401));
  }

  if (!existingUser) {
    return next(new HttpError("User doesnt exist", 401));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (e) {
    return next(new HttpError("Login error", 401));
  }

  if (!isValidPassword) {
    return next(new HttpError("Password does not exist", 401));
  }

  const token = jwt.sign(
    { userID: existingUser._id, email: existingUser.email },
    "secret_key",
    { expiresIn: "1h" }
  );

  res.json({ name: existingUser.name, id: existingUser._id, token });
};

export const registerUser = async (req, res, next: NextFunction) => {
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

    const hashedPassword = await bcrypt.hash(password, 12);
    newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar: req.file
        ? `${req.protocol}://${req.headers.host}/${req.file.path}`
        : undefined,
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

  const token = jwt.sign(
    { userID: newUser._id, email: newUser.email },
    "secret_key",
    { expiresIn: "1h" }
  );

  res.status(200).json({ name: newUser.name, id: newUser._id, token });
};

export const updateUser = async (req, res, next: NextFunction) => {
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
