const express = require("express");
const authValidator = require("../validators/auth.validator");
const authController = require("../controllers/auth.controllers");

const router = express.Router();

router.post(
  "/register",
  authValidator.registerValidator,
  authController.registerUser,
);

router.post("/login", authValidator.loginValidator, authController.loginUser);

module.exports = router;
