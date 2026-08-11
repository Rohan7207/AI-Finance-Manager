const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    year: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
      default: "INR",
    },
  },
  {
    timestamps: true,
  },
);

// Ensures one budget per user per month/year.
budgetSchema.index(
  {
    user: 1,
    month: 1,
    year: 1,
  },
  {
    unique: true,
  },
);

const budgetModel = mongoose.model("Budget", budgetSchema);

module.exports = budgetModel;
