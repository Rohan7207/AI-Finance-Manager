const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const dashboardValidator = require("../validators/dashboard.validator");
const dashboardController = require("../controllers/dashboard.controller");
const { route } = require("./income.route");

router.get("/", authMiddleware.authUser, dashboardController.getDashboardData);

router.get(
  "/financial-trend",
  authMiddleware.authUser,
  dashboardValidator.financialTrendValidator,
  dashboardController.getFinancialData,
);

module.exports = router;
