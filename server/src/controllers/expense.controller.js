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
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Please provide at least one field to update.",
      });
    }

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

async function deleteExpense(req, res) {
  try {
    const expenseId = req.params.expenseId;

    const deletedExpense = await expenseService.deleteExpense(
      expenseId,
      req.user._id,
    );

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getExpenseAnalytics(req, res) {
  try {
    const categoryExpenses = await expenseService.getExpenseAnalytics(
      req.user._id,
    );

    return res.status(200).json({
      message: "Analytics of expenses retrieved successfully",
      categoryExpenses,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getMonthlyExpenseAnalytics(req, res) {
  try {
    const monthlyExpenseTrends =
      await expenseService.getMonthlyExpenseAnalytics(req.user._id);

    return res.status(200).json({
      message: "Monthly Expense Analytics retrieved successfully",
      monthlyExpenseTrends,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseAnalytics,
  getMonthlyExpenseAnalytics,
};
