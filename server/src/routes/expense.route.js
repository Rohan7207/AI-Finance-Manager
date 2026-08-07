const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const expenseValidator = require("../validators/expense.validator");
const expenseController = require("../controllers/expense.controller");

router.post(
  "/",
  authMiddleware.authUser,
  expenseValidator.expenseValidation,
  expenseController.addExpense,
);

router.get("/", authMiddleware.authUser, expenseController.getExpenses);

module.exports = router;
