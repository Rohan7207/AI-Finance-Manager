const budgetModel = require("../models/budget.model");
const expenseModel = require("../models/expense.model");

function normalizeBudgetName(name) {
  const trimmedName = typeof name === "string" ? name.trim() : "";
  return trimmedName || "Unnamed Budget";
}

function mapBudgetWithName(budget) {
  if (!budget) return budget;

  const plainBudget = budget.toObject ? budget.toObject() : budget;

  return {
    ...plainBudget,
    name: normalizeBudgetName(plainBudget.name),
  };
}

async function createBudget(budgetData, userId) {
  const budget = new budgetModel({
    ...budgetData,
    name: normalizeBudgetName(budgetData.name),
    user: userId,
  });

  await budget.save();

  return mapBudgetWithName(budget);
}

async function getBudgets(userId, page = 1, limit = 12) {
  const skip = (page - 1) * limit;

  const [budgets, totalBudgets] = await Promise.all([
    budgetModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    budgetModel.countDocuments({ user: userId }),
  ]);

  return {
    budgets: budgets.map(mapBudgetWithName),
    pagination: {
      page,
      limit,
      total: totalBudgets,
      totalPages: Math.ceil(totalBudgets / limit),
    },
  };
}

async function getBudgetById(budgetId, userId) {
  const budget = await budgetModel.findOne({
    _id: budgetId,
    user: userId,
  });

  return mapBudgetWithName(budget);
}

async function updateBudget(budgetData, budgetId, userId) {
  const budget = await budgetModel.findOne({
    _id: budgetId,
    user: userId,
  });

  if (!budget) {
    throw new Error("Budget not found");
  }

  const normalizedBudgetData = {
    ...budgetData,
  };

  if (normalizedBudgetData.name !== undefined) {
    normalizedBudgetData.name = normalizeBudgetName(normalizedBudgetData.name);
  }

  const startDate = normalizedBudgetData.startDate || budget.startDate;
  const endDate = normalizedBudgetData.endDate || budget.endDate;

  if (new Date(endDate) <= new Date(startDate)) {
    throw new Error("End Date must be after Start Date");
  }

  const updatedBudget = await budgetModel.findOneAndUpdate(
    {
      _id: budgetId,
      user: userId,
    },
    normalizedBudgetData,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedBudget ? mapBudgetWithName(updatedBudget) : updatedBudget;
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

  const safeName = normalizeBudgetName(budget.name);
  const now = new Date();

  if (now < budget.startDate) {
    return {
      budgetId: budget._id,
      name: safeName,
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
  const percentageUsed = Number(
    ((totalExpensesSum / budget.amount) * 100).toFixed(2),
  );

  return {
    budgetId: budget._id,
    name: safeName,
    budget: budget.amount,
    spent: totalExpensesSum,
    remaining,
    percentageUsed,
  };
}

// Get all the active budgets for current day
async function getActiveBudgets(userId) {
  const today = new Date();

  return await budgetModel.find({
    user: userId,
    startDate: { $lte: today },
    endDate: { $gte: today },
  });
}

module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getBudgetAnalytics,
  getActiveBudgets,
};
