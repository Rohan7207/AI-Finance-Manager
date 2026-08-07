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

async function getExpenseById(req, res) {
  try {
    const expenseId = req.params.expenseId;

    const expense = await expenseService.getExpenseById(
      expenseId,
      req.user._id,
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({
      message: "Expense retrived successfully",
      expense,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateExpense(req, res) {
  try {
    const expenseId = req.params.expenseId;
    const updatedData = req.body;

    const updatedExpense = await expenseService.updateExpense(
      expenseId,
      updatedData,
      req.user._id,
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res
      .status(200)
      .json({ message: "Expense updated successfully", updatedExpense });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { addExpense, getExpenses, getExpenseById, updateExpense };
