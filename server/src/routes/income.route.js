const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const incomeValidation = require("../validators/income.validator");
const incomeController = require("../controllers/income.controller");

router.post(
  "/",
  authMiddleware.authUser,
  incomeValidation.incomeValidator,
  incomeController.createIncome,
);

router.get("/", authMiddleware.authUser, incomeController.getIncomes);

router.get(
  "/analytics/monthly",
  authMiddleware.authUser,
  incomeController.getMonthlyIncomeAnalytics,
);

router.get(
  "/analytics",
  authMiddleware.authUser,
  incomeController.getIncomeAnalytics,
);

router.get(
  "/:incomeId",
  authMiddleware.authUser,
  incomeController.getIncomeById,
);

router.put(
  "/:incomeId",
  authMiddleware.authUser,
  incomeValidation.updateIncomeValidator,
  incomeController.updateIncome,
);

router.delete(
  "/:incomeId",
  authMiddleware.authUser,
  incomeController.deleteIncome,
);

module.exports = router;
