const expenseModel = require("../models/expense.model");
const expenseService = require("../services/expense.service");

async function addExpense(req, res) {
  try {
    const expense = await expenseService.createExpense(req.body, req.user._id);

    return res
      .status(201)
      .json({ message: "Expense added successfully", expense });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getExpenses(req, res) {
  try {
    const expenses = await expenseService.getExpenses(req.user._id);

    return res.status(200).json({
      message: "Expenses retrived successfully ",
      expenses,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { addExpense, getExpenses };
