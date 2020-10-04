import HttpError from "../models/httpError";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Authentucation failed");
    const decodedToken = jwt.verify(token, "secret_key");
    req.userData = { userID: decodedToken.userID };
    next();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Authetnication failed!", 401);
    return next(error);
  }
};
