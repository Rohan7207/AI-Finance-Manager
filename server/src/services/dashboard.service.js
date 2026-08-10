const incomeModel = require("../models/income.model");
const expenseModel = require("../models/expense.model");

const incomeService = require("../services/income.service");
const expenseService = require("../services/expense.service");

async function getDashboardData(userId) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

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

  const monthlyIncomeSum = await incomeModel.aggregate([
    {
      $match: {
        user: userId,
        incomeDate: {
          $gte: startOfMonth,
          $lt: startOfNextMonth,
        },
      },
    },

    {
      $group: {
        _id: null,
        monthlyIncome: { $sum: "$amount" },
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

  const monthlyExpenseSum = await expenseModel.aggregate([
    {
      $match: {
        user: userId,
        expenseDate: {
          $gte: startOfMonth,
          $lt: startOfNextMonth,
        },
      },
    },

    {
      $group: {
        _id: null,
        monthlyExpense: { $sum: "$amount" },
      },
    },
  ]);

  const totalIncome = incomeSum[0]?.totalIncome || 0;
  const totalExpense = expenseSum[0]?.totalExpense || 0;

  const monthlyIncome = monthlyIncomeSum[0]?.monthlyIncome || 0;
  const monthlyExpense = monthlyExpenseSum[0]?.monthlyExpense || 0;

  const balance = totalIncome - totalExpense;
  const monthlySavings = monthlyIncome - monthlyExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
    monthly: {
      income: monthlyIncome,
      expense: monthlyExpense,
      savings: monthlySavings,
    },
  };
}

async function getMonthlyFinancialData(userId) {
  const monthlyIncome = await incomeService.getMonthlyIncomeAnalytics(userId);

  const monthlyExpense =
    await expenseService.getMonthlyExpenseAnalytics(userId);

  const monthlyFinancialTrend = monthlyIncome.map((income) => {
    const expense = monthlyExpense.find(
      (expense) =>
        expense.year === income.year && expense.month === income.month,
    );

    return {
      year: income.year,
      month: income.month,
      income: income.totalIncome,
      expense: expense ? expense.totalExpense : 0,
      savings: income.totalIncome - (expense ? expense.totalExpense : 0),
    };
  });

  return monthlyFinancialTrend;
}

module.exports = { getDashboardData, getMonthlyFinancialData };
