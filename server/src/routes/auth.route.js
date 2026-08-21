const express = require("express");
const authValidator = require("../validators/auth.validator");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/register",
  authValidator.registerValidator,
  authController.registerUser,
);

router.post("/login", authValidator.loginValidator, authController.loginUser);

router.post(
  "/forgot-password",
  authValidator.forgotPasswordValidator,
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  authValidator.resetPasswordValidator,
  authController.resetPassword,
);

router.get("/profile", authMiddleware.authUser, authController.getUserProfile);

router.post("/logout", authMiddleware.authUser, authController.logoutUser);

module.exports = router;
