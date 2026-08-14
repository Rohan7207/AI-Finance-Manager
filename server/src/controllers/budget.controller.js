const budgetService = require("../services/budget.service");

async function createBudget(req, res) {
  try {
    const budget = await budgetService.createBudget(req.body, req.user._id);

    return res.status(201).json({
      message: "Budget created successfully",
      budget,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getBudgets(req, res) {
  try {
    const budgets = await budgetService.getBudgets(req.user._id);

    if (budgets.length === 0) {
      return res.status(200).json({
        message:
          "No budgets found. Add your first budget to start tracking your spending.",
        budgets: [],
      });
    }

    return res.status(200).json({
      message: "Budgets retrieved successfully",
      budgets,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getBudgetById(req, res) {
  try {
    const budgetId = req.params.budgetId;

    const budget = await budgetService.getBudgetById(budgetId, req.user._id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    return res.status(200).json({
      message: "Budget retrieved successfully",
      budget,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateBudget(req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Please provide at least one field to update.",
      });
    }

    const budgetData = req.body;
    const budgetId = req.params.budgetId;

    const updatedBudget = await budgetService.updateBudget(
      budgetData,
      budgetId,
      req.user._id,
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    return res.status(200).json({
      message: "Budget updated successfully",
      updatedBudget,
    });
  } catch (err) {
    console.error(err);
    if (err.message === "End Date must be after Start Date") {
      return res.status(400).json({
        message: err.message,
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteBudget(req, res) {
  try {
    const budgetId = req.params.budgetId;
    const deletedBudget = await budgetService.deleteBudget(
      budgetId,
      req.user._id,
    );

    if (!deletedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    return res.status(200).json({
      message: "Budget deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getBudgetAnalytics(req, res) {
  try {
    const analytics = await budgetService.getBudgetAnalytics(
      req.params.budgetId,
      req.user._id,
    );

    return res.status(200).json({
      message: "Budget analytics retrieved successfully",
      analytics,
    });
  } catch (err) {
    console.error(err);

    if (err.message === "Budget not found") {
      return res.status(404).json({
        message: err.message,
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getBudgetAnalytics,
};
