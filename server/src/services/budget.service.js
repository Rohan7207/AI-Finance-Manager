const budgetModel = require("../models/budget.model");
const expenseModel = require("../models/expense.model");

async function createBudget(budgetData, userId) {
  const budget = new budgetModel({
    ...budgetData,
    user: userId,
  });

  await budget.save();

  return budget;
}

async function getBudgets(userId) {
  const budgets = await budgetModel.find({ user: userId });

  return budgets;
}

async function getBudgetById(budgetId, userId) {
  const budget = await budgetModel.findOne({
    _id: budgetId,
    user: userId,
  });

  return budget;
}

async function updateBudget(budgetData, budgetId, userId) {
  const budget = await budgetModel.findOne({
    _id: budgetId,
    user: userId,
  });

  if (!budget) {
    throw new Error("Budget not found");
  }

  const startDate = budgetData.startDate || budget.startDate;
  const endDate = budgetData.endDate || budget.endDate;

  if (new Date(endDate) <= new Date(startDate)) {
    throw new Error("End Date must be after Start Date");
  }

  const updatedBudget = await budgetModel.findOneAndUpdate(
    {
      _id: budgetId,
      user: userId,
    },
    budgetData,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedBudget;
}

async function deleteBudget(budgetId, userId) {
  const deletedBudget = await budgetModel.findOneAndDelete({
    _id: budgetId,
    user: userId,
  });

  return deletedBudget;
}

// Connect the budget with the user's actual expenses for that month budget
async function getBudgetAnalytics(budgetId, userId) {
  const budget = await budgetModel.findOne({
    _id: budgetId,
    user: userId,
  });

  if (!budget) {
    throw new Error("Budget not found");
  }

  const now = new Date();

  if (now < budget.startDate) {
    return {
      budget: budget.amount,
      spent: 0,
      remaining: budget.amount,
      percentageUsed: 0,
    };
  }

  const startDate = budget.startDate;
  const endDate = budget.endDate < now ? budget.endDate : now;

  const analytics = await expenseModel.aggregate([
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
        _id: null,
        totalExpensesSum: { $sum: "$amount" },
      },
    },
  ]);

  const totalExpensesSum = analytics[0]?.totalExpensesSum || 0;
  const remaining = budget.amount - totalExpensesSum;
  const percentageUsed = (totalExpensesSum / budget.amount) * 100;

  return {
    budget: budget.amount,
    spent: totalExpensesSum,
    remaining,
    percentageUsed,
  };
}

module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getBudgetAnalytics,
};
