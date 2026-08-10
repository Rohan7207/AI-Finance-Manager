const dashboardService = require("../services/dashboard.service");

async function getDashboardData(req, res) {
  try {
    const data = await dashboardService.getDashboardData(req.user._id);

    return res.status(200).json({
      message: "Data retrieved successfully",
      totalIncome: data.totalIncome,
      totalExpense: data.totalExpense,
      balance: data.balance,
      monthly: data.monthly,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getMonthlyFinancialData(req, res) {
  try {
    const monthlyFinancialTrend =
      await dashboardService.getMonthlyFinancialData(req.user._id);

    return res.status(200).json({
      message: "Monthly Financial Trend retrieved successfully",
      monthlyFinancialTrend,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getDashboardData, getMonthlyFinancialData };
