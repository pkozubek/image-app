const express = require("express");

const controllers = require("../controllers/images");
const router = express.Router();

router.get("/user/:id", controllers.getUserImages);
router.get("/:id", controllers.getImageById);

router.post("/", controllers.createImage);

router.patch("/:id", controllers.updateImage);

router.delete("/:id", controllers.deleteImage);

module.exports = router;
