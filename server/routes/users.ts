import express from "express";
import { check } from "express-validator";
import * as controllers from "../controllers/users";
import { fileUpload } from "../middlewares/fileUpload";
const router = express.Router();

router.get("/", controllers.getUsersData);
router.get("/:id", controllers.getUserData);

router.post(
  "/register",
  fileUpload.single("avatar"),
  [
    check("name").not().isEmpty(),
    check("password").not().isEmpty(),
    check("email").isEmail(),
  ],
  controllers.registerUser
);

router.post("/login", controllers.loginUser);
router.delete("/:id", controllers.deleteUser);
router.patch(
  "/:id",
  [
    check("name").not().isEmpty(),
    check("password").not().isEmpty(),
    check("email").isEmail(),
  ],
  controllers.updateUser
);

export default router;
