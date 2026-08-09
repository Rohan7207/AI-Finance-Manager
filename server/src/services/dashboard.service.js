const incomeModel = require("../models/income.model");
const expenseModel = require("../models/expense.model");

async function getDashboardData(userId) {
  const incomeSum = await incomeModel.aggregate([
    {
      $match: { user: userId },
    },

    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$amount" },
      },
    },
  ]);

  const expenseSum = await expenseModel.aggregate([
    {
      $match: { user: userId },
    },

    {
      $group: {
        _id: null,
        totalExpense: { $sum: "$amount" },
      },
    },
  ]);

  const totalIncome = incomeSum[0]?.totalIncome || 0;
  const totalExpense = expenseSum[0]?.totalExpense || 0;

  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
  };
}

module.exports = { getDashboardData };
