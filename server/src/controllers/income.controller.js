const { json } = require("express");
const incomeModel = require("../models/income.model");
const incomeService = require("../services/income.service");

async function createIncome(req, res) {
  try {
    const income = await incomeService.createIncome(req.body, req.user._id);

    return res.status(201).json({
      message: "Income added successfully",
      income,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getIncomes(req, res) {
  try {
    const incomes = await incomeService.getIncomes(req.user._id);

    return res.status(200).json({
      message: "Incomes retrieved successfully",
      incomes,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getIncomeById(req, res) {
  try {
    const incomeId = req.params.incomeId;

    const income = await incomeService.getIncomeById(incomeId, req.user._id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    return res.status(200).json({
      message: "Income retrieved successfully",
      income,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateIncome(req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Please provide at least one field to update.",
      });
    }

    const incomeId = req.params.incomeId;
    const incomeData = req.body;

    const updatedIncome = await incomeService.updateIncome(
      incomeData,
      incomeId,
      req.user._id,
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    return res.status(200).json({
      message: "Income updated successfully",
      updatedIncome,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteIncome(req, res) {
  try {
    const incomeId = req.params.incomeId;

    const deletedIncome = await incomeService.deleteIncome(
      incomeId,
      req.user._id,
    );

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    return res.status(200).json({
      message: "Deleted income successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getIncomeAnalytics(req, res) {
  try {
    const sourceIncomes = await incomeService.getIncomeAnalytics(req.user._id);

    return res.status(200).json({
      message: "Income analytics retrieved successfully",
      sourceIncomes,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getMonthlyIncomeAnalytics(req, res) {
  try {
    const monthlyIncomeTrends = await incomeService.getMonthlyIncomeAnalytics(
      req.user._id,
    );

    return res.status(200).json({
      message: "Monthly Income Analytics retrieved successfully",
      monthlyIncomeTrends,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
  getIncomeAnalytics,
  getMonthlyIncomeAnalytics,
};
