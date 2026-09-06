const incomeModel = require("../models/income.model");
const expenseModel = require("../models/expense.model");

const incomeService = require("../services/income.service");
const expenseService = require("../services/expense.service");
const budgetService = require("../services/budget.service");

async function getDashboardData(userId) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const startOfPreviousMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1,
  );

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

  const totalIncomeUntilPreviousMonthSum = await incomeModel.aggregate([
    {
      $match: {
        user: userId,
        incomeDate: {
          $lt: startOfMonth,
        },
      },
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

  const previousMonthIncomeSum = await incomeModel.aggregate([
    {
      $match: {
        user: userId,
        incomeDate: {
          $gte: startOfPreviousMonth,
          $lt: startOfMonth,
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

  const totalExpenseUntilPreviousMonthSum = await expenseModel.aggregate([
    {
      $match: {
        user: userId,
        expenseDate: {
          $lt: startOfMonth,
        },
      },
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

  const previousMonthExpenseSum = await expenseModel.aggregate([
    {
      $match: {
        user: userId,
        expenseDate: {
          $gte: startOfPreviousMonth,
          $lt: startOfMonth,
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

  const previousMonthIncome = previousMonthIncomeSum[0]?.monthlyIncome || 0;
  const previousMonthExpense = previousMonthExpenseSum[0]?.monthlyExpense || 0;

  const totalIncomeUntilPreviousMonth =
    totalIncomeUntilPreviousMonthSum[0]?.totalIncome || 0;
  const totalExpenseUntilPreviousMonth =
    totalExpenseUntilPreviousMonthSum[0]?.totalExpense || 0;

  const balance = totalIncome - totalExpense;
  const previousBalance =
    totalIncomeUntilPreviousMonth - totalExpenseUntilPreviousMonth;

  const monthlySavings = monthlyIncome - monthlyExpense;
  const previousMonthSavings = previousMonthIncome - previousMonthExpense;

  const incomeChange = percentageCalculate(monthlyIncome, previousMonthIncome);
  const expenseChange = percentageCalculate(
    monthlyExpense,
    previousMonthExpense,
  );
  const balanceChange = percentageCalculate(balance, previousBalance);
  const savingsChange = percentageCalculate(
    monthlySavings,
    previousMonthSavings,
  );

  const activeBudgets = await budgetService.getActiveBudgets(userId);

  const budgetOverview = await Promise.all(
    activeBudgets.map((budget) =>
      budgetService.getBudgetAnalytics(budget._id, userId),
    ),
  );

  const recentTransactions = await getRecentTransactions(userId);

  return {
    totalIncome,
    totalExpense,
    balance,

    changes: {
      incomeChange,
      expenseChange,
      balanceChange,
      savingsChange,
    },

    monthly: {
      income: monthlyIncome,
      expense: monthlyExpense,
      savings: monthlySavings,
    },

    budgetOverview,
    recentTransactions,
  };
}

async function financialTrend(userId, period) {
  const now = new Date();

  let startDate;
  let endDate;
  let incomeGroup;
  let expenseGroup;

  if (period === "week") {
    const day = now.getDay();

    startDate = new Date(now);
    startDate.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
    startDate.setHours(0, 0, 0, 0);

    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);

    incomeGroup = {
      year: { $year: "$incomeDate" },
      month: { $month: "$incomeDate" },
      day: { $dayOfMonth: "$incomeDate" },
    };

    expenseGroup = {
      year: { $year: "$expenseDate" },
      month: { $month: "$expenseDate" },
      day: { $dayOfMonth: "$expenseDate" },
    };
  } else if (period === "month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    incomeGroup = {
      year: { $year: "$incomeDate" },
      month: { $month: "$incomeDate" },
      day: { $dayOfMonth: "$incomeDate" },
    };

    expenseGroup = {
      year: { $year: "$expenseDate" },
      month: { $month: "$expenseDate" },
      day: { $dayOfMonth: "$expenseDate" },
    };
  } else if (period === "year") {
    startDate = new Date(now.getFullYear(), 0, 1);
    endDate = new Date(now.getFullYear() + 1, 0, 1);

    incomeGroup = {
      year: { $year: "$incomeDate" },
      month: { $month: "$incomeDate" },
    };

    expenseGroup = {
      year: { $year: "$expenseDate" },
      month: { $month: "$expenseDate" },
    };
  } else {
    throw new Error("Invalid period. Use week, month, or year.");
  }

  const incomeData = await incomeModel.aggregate([
    {
      $match: {
        user: userId,
        incomeDate: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: incomeGroup,
        income: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1,
      },
    },
  ]);

  const expenseData = await expenseModel.aggregate([
    {
      $match: {
        user: userId,
        expenseDate: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: expenseGroup,
        expense: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
        "_id.day": 1,
      },
    },
  ]);

  // Combine income and expense data here
  // Then calculate savings and return the final chart data.
  const getKey = (id) => {
    const year = id.year;
    const month = String(id.month).padStart(2, "0");

    if (id.day) {
      const day = String(id.day).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    return `${year}-${month}`;
  };

  const combinedData = {};

  incomeData.forEach((item) => {
    const key = getKey(item._id);

    combinedData[key] = {
      date: key,
      income: item.income,
      expense: 0,
    };
  });

  expenseData.forEach((item) => {
    const key = getKey(item._id);

    if (!combinedData[key]) {
      combinedData[key] = {
        date: key,
        income: 0,
        expense: 0,
      };
    }

    combinedData[key].expense = item.expense;
  });

  const financialTrend = Object.values(combinedData)
    .map((item) => ({
      date: item.date,
      income: item.income,
      expense: item.expense,
      savings: item.income - item.expense,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    financialTrend,
  };
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

function percentageCalculate(currentValue, previousValue) {
  if (previousValue === 0) {
    if (currentValue === 0) {
      return 0;
    }

    return null;
  }

  return Number(
    (((currentValue - previousValue) / previousValue) * 100).toFixed(2),
  );
}

async function getRecentTransactions(userId) {
  const incomes = await incomeModel
    .find({ user: userId })
    .sort({ incomeDate: -1 })
    .limit(5)
    .lean();

  const expenses = await expenseModel
    .find({ user: userId })
    .sort({ expenseDate: -1 })
    .limit(5)
    .lean();

  const transactions = [
    ...incomes.map((income) => ({
      type: "income",
      amount: income.amount,
      description: income.description,
      date: income.incomeDate,
      source: income.source,
    })),

    ...expenses.map((expense) => ({
      type: "expense",
      amount: expense.amount,
      description: expense.description,
      date: expense.expenseDate,
      category: expense.category,
    })),
  ];

  return transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
}

module.exports = {
  getDashboardData,
  financialTrend,
  getFinancialContext,
};
