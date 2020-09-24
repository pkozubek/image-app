import express from "express";
import { check } from "express-validator";
import * as controllers from "../controllers/images";
import { fileUpload } from "../middlewares/fileUpload";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/", controllers.getAllImages);
router.get("/user/:id", controllers.getUserImages);
router.get("/:id", controllers.getImageById);

router.use(authMiddleware);

router.post(
  "/",
  fileUpload.single("image"),
  [check("name").not().isEmpty(), check("author").not().isEmpty()],
  controllers.createImage
);

router.post("/add_view/:id", controllers.addView);

router.patch("/:id", [check("name").not().isEmpty()], controllers.updateImage);
router.delete("/:id", controllers.deleteImage);

export default router;
