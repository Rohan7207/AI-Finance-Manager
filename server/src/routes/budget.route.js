const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budget.controller");
const budgetValidator = require("../validators/budget.validator");
const authMiddleware = require("../middlewares/auth.middleware");
const { route } = require("./auth.route");

router.post(
  "/",
  authMiddleware.authUser,
  budgetValidator.budgetValidator,
  budgetController.createBudget,
);

router.get("/", authMiddleware.authUser, budgetController.getBudgets);

router.get(
  "/:budgetId/analytics",
  authMiddleware.authUser,
  budgetController.getBudgetAnalytics,
);

router.get(
  "/:budgetId",
  authMiddleware.authUser,
  budgetController.getBudgetById,
);

router.put(
  "/:budgetId",
  authMiddleware.authUser,
  budgetValidator.updateBudgetValidator,
  budgetController.updateBudget,
);

router.delete(
  "/:budgetId",
  authMiddleware.authUser,
  budgetController.deleteBudget,
);

module.exports = router;
