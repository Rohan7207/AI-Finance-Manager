const incomeModel = require("../models/income.model");
const expenseModel = require("../models/expense.model");

const incomeService = require("../services/income.service");
const expenseService = require("../services/expense.service");
const budgetService = require("../services/budget.service");

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

  const months = [
    ...monthlyIncome.map((item) => `${item.year}-${item.month}`),
    ...monthlyExpense.map((item) => `${item.year}-${item.month}`),
  ];

  const uniqueMonths = [...new Set(months)];

  const monthlyFinancialTrend = uniqueMonths.map((monthKey) => {
    const [year, month] = monthKey.split("-");

    const income = monthlyIncome.find(
      (item) => item.year === Number(year) && item.month === month,
    );

    const expense = monthlyExpense.find(
      (item) => item.year === Number(year) && item.month === month,
    );

    const incomeAmount = income ? income.totalIncome : 0;
    const expenseAmount = expense ? expense.totalExpense : 0;

    return {
      year: Number(year),
      month,
      income: incomeAmount,
      expense: expenseAmount,
      savings: incomeAmount - expenseAmount,
    };
  });

  const monthOrder = [
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

  monthlyFinancialTrend.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }

    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
  });

  return monthlyFinancialTrend;
}

async function getFinancialContext(userId) {
  const dashboardData = await getDashboardData(userId);
  const expenseCategoryData = await expenseService.getExpenseAnalytics(userId);
  const monthlyFinancialTrend = await getMonthlyFinancialData(userId);
  const activeBudgets = await budgetService.getActiveBudgets(userId);

  const monthlyIncomeSum = dashboardData.monthlyIncomeSum;
  const monthlyExpenseSum = dashboardData.monthlyExpenseSum;

  const monthlyIncome = monthlyIncomeSum[0]?.monthlyIncome || 0;
  const monthlyExpense = monthlyExpenseSum[0]?.monthlyExpense || 0;

  const monthlySavings = monthlyIncome - monthlyExpense;

  const budgetAnalytics = await Promise.all(
    activeBudgets.map((budget) =>
      budgetService.getBudgetAnalytics(budget._id, userId),
    ),
  );

  const recentMonthlyTrend = monthlyFinancialTrend.slice(-6);

  return {
    currentMonth: {
      income: monthlyIncome,
      expenses: monthlyExpense,
      savings: monthlySavings,
      topExpenseCategory: expenseCategoryData[0] || null,
    },

    historicalTrend: recentMonthlyTrend,

    budgets: budgetAnalytics,
  };
}

module.exports = {
  getDashboardData,
  getMonthlyFinancialData,
  getFinancialContext,
};
