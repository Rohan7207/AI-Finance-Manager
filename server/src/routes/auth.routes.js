const express = require("express");
const authValidator = require("../validators/auth.validator");
const authController = require("../controllers/auth.controllers");

const router = express.Router();

router.post(
  "/register",
  authValidator.registerValidator,
  authController.registerUser,
);

module.exports = router;
