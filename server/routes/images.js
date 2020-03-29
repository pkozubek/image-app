const express = require("express");
const { check } = require("express-validator");
const controllers = require("../controllers/images");
const router = express.Router();

router.get("/", controllers.getAllImages);
router.get("/user/:id", controllers.getUserImages);
router.get("/:id", controllers.getImageById);

router.post(
  "/",
  [
    check("name")
      .not()
      .isEmpty(),
    check("author")
      .not()
      .isEmpty()
  ],
  controllers.createImage
);

router.patch(
  "/:id",
  [
    check("name")
      .not()
      .isEmpty()
  ],
  controllers.updateImage
);

router.delete("/:id", controllers.deleteImage);

module.exports = router;
