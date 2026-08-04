const express = require("express");
const authValidator = require("../validators/auth.validator");
const authController = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/register",
  authValidator.registerValidator,
  authController.registerUser,
);

router.post("/login", authValidator.loginValidator, authController.loginUser);

router.get("/profile", authMiddleware.authUser, authController.getUserProfile);

router.get("/logout", authMiddleware.authUser, authController.logoutUser);

module.exports = router;
