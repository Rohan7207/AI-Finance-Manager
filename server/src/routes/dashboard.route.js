const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const dashboardController = require("../controllers/dashboard.controller");
const { route } = require("./income.route");

router.get("/", authMiddleware.authUser, dashboardController.getDashboardData);

router.get(
  "/monthly",
  authMiddleware.authUser,
  dashboardController.getMonthlyFinancialData,
);

module.exports = router;
