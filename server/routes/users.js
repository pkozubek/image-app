const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const controllers = require("../controllers/users");

router.get("/", controllers.getUsersData);
router.get("/:id", controllers.getUserData);

router.post(
  "/register",
  [
    check("name")
      .not()
      .isEmpty(),
    check("password")
      .not()
      .isEmpty(),
    check("email").isEmail()
  ],
  controllers.registerUser
);

router.post("/login", controllers.loginUser);
router.delete("/:id", controllers.deleteUser);
router.patch(
  "/:id",
  [
    check("name")
      .not()
      .isEmpty(),
    check("password")
      .not()
      .isEmpty(),
    check("email").isEmail()
  ],
  controllers.updateUser
);

module.exports = router;
