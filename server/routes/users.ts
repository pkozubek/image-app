import express from "express";
import { check } from "express-validator";
import * as controllers from "../controllers/users";
import { authMiddleware } from "../middlewares/auth";
import { fileUpload } from "../middlewares/fileUpload";
const router = express.Router();

router.post("/login", controllers.loginUser);
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

router.use(authMiddleware);

router.get("/", controllers.getUsersData);
router.get("/:id", controllers.getUserData);
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
