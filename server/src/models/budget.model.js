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

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
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

const budgetModel = mongoose.model("Budget", budgetSchema);

module.exports = budgetModel;
