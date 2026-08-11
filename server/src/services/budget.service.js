const budgetModel = require("../models/budget.model");

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

module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
