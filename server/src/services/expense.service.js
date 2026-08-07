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

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
