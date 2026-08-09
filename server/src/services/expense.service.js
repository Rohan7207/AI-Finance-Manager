const expenseModel = require("../models/expense.model");

async function createExpense(expenseData, userId) {
  const expense = new expenseModel({
    ...expenseData,
    user: userId,
  });

  await expense.save();

  return expense;
}

async function getExpenses(userId) {
  const expenses = await expenseModel.find({ user: userId });

  return expenses;
}

async function getExpenseById(expenseId, userId) {
  const expense = await expenseModel.findOne({ _id: expenseId, user: userId });

  return expense;
}

async function updateExpense(expenseId, updatedData, userId) {
  const updatedExpense = await expenseModel.findOneAndUpdate(
    {
      _id: expenseId,
      user: userId,
    },
    updatedData,
    {
      new: true, // Return the modified document rather than the original
      runValidators: true, // Ensure data adheres to schema rules during update
    },
  );

  return updatedExpense;
}

async function deleteExpense(expenseId, userId) {
  const deletedExpense = await expenseModel.findOneAndDelete({
    _id: expenseId,
    user: userId,
  });

  return deletedExpense;
}

async function getExpenseAnalytics(userId) {
  const expenseByCategory = await expenseModel.aggregate([
    {
      $match: {
        user: userId,
      },
    },

    {
      $group: {
        _id: "$category",
        categoryExpenses: { $sum: "$amount" },
      },
    },

    {
      $sort: {
        categoryExpenses: -1,
      },
    },
  ]);

  return expenseByCategory;
}

async function getMonthlyExpenseAnalytics(userId) {
  const monthlyExpenseTrends = await expenseModel.aggregate([
    {
      $match: { user: userId },
    },

    {
      $group: {
        _id: {
          year: { $year: "$expenseDate" },
          month: { $month: "$expenseDate" },
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

  const formattedData = monthlyExpenseTrends.map((item) => ({
    year: item._id.year,
    month: months[item._id.month - 1],
    totalExpense: item.monthlyAnalyticsSum,
  }));

  return formattedData;
}

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseAnalytics,
  getMonthlyExpenseAnalytics,
};
