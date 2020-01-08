const express = require("express");
const router = express.Router();

const controllers = require("../controllers/user");

router.get("/:id", controllers.getUserData);

module.exports = router;
