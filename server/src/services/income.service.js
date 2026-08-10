const incomeModel = require("../models/income.model");

async function createIncome(incomeData, userId) {
  const income = new incomeModel({
    ...incomeData,
    user: userId,
  });

  await income.save();

  return income;
}

async function getIncomes(userId) {
  const incomes = await incomeModel.find({ user: userId });

  return incomes;
}

async function getIncomeById(incomeId, userId) {
  const income = await incomeModel.findOne({ _id: incomeId, user: userId });

  return income;
}

async function updateIncome(incomeData, incomeId, userId) {
  const updatedIncome = await incomeModel.findOneAndUpdate(
    {
      _id: incomeId,
      user: userId,
    },
    incomeData,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedIncome;
}

async function deleteIncome(incomeId, userId) {
  const deletedIncome = await incomeModel.findOneAndDelete({
    _id: incomeId,
    user: userId,
  });

  return deletedIncome;
}

async function getIncomeAnalytics(userId) {
  const incomeBySource = await incomeModel.aggregate([
    {
      $match: { user: userId },
    },

    {
      $group: {
        _id: "$source",
        sourceIncome: { $sum: "$amount" },
      },
    },

    {
      $sort: { sourceIncome: -1 },
    },
  ]);

  return incomeBySource;
}

async function getMonthlyIncomeAnalytics(userId) {
  const monthlyIncomeTrends = await incomeModel.aggregate([
    {
      $match: { user: userId },
    },

    {
      $group: {
        _id: {
          year: { $year: "$incomeDate" },
          month: { $month: "$incomeDate" },
        },

        monthlyAnalyticsSum: { $sum: "$amount" },
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = monthlyIncomeTrends.map((item) => ({
    year: item._id.year,
    month: months[item._id.month - 1],
    totalIncome: item.monthlyAnalyticsSum,
  }));

  return formattedDate;
}

module.exports = {
  createIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
  getIncomeAnalytics,
  getMonthlyIncomeAnalytics,
};
