const incomeModel = require("../models/income.model");

async function createIncome(incomeData, userId) {
  const income = new incomeModel({
    ...incomeData,
    user: userId,
  });

  await income.save();

  return income;
}

async function getIncomes(userId) {
  const incomes = await incomeModel.find({ user: userId });

  return incomes;
}

async function getIncomeById(incomeId, userId) {
  const income = await incomeModel.findOne({ _id: incomeId, user: userId });

  return income;
}

async function updateIncome(incomeData, incomeId, userId) {
  const updatedIncome = await incomeModel.findOneAndUpdate(
    {
      _id: incomeId,
      user: userId,
    },
    incomeData,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedIncome;
}

async function deleteIncome(incomeId, userId) {
  const deletedIncome = await incomeModel.findOneAndDelete({
    _id: incomeId,
    user: userId,
  });

  return deletedIncome;
}

module.exports = {
  createIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
};
