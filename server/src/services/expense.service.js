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

module.exports = { createExpense, getExpenses };
