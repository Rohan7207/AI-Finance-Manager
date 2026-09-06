const dashboardService = require("../services/dashboard.service");

async function getDashboardData(req, res) {
  try {
    const dashboardData = await dashboardService.getDashboardData(req.user._id);

    return res.status(200).json({
      message: "Data retrieved successfully",
      ...dashboardData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getFinancialData(req, res) {
  try {
    const financialTrend = await dashboardService.financialTrend(
      req.user._id,
      req.query.period,
    );

    return res.status(200).json({
      message: "Financial Trend retrieved successfully",
      ...financialTrend,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getDashboardData, getFinancialData };
