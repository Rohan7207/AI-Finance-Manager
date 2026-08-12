const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Health",
        "Education",
        "Entertainment",
        "Investment",
        "Others",
      ],
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: [
        "Cash",
        "UPI",
        "Debit Card",
        "Credit Card",
        "Net Banking",
        "Wallet",
      ],
    },

    expenseDate: {
      type: Date,
      required: true,
    },

    merchant: {
      type: String,
      trim: true,
    },

    currency: {
      type: String,
      required: true,
      default: "INR",
    },

    notes: {
      type: String,
      trim: true,
    },

    receiptImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

expenseSchema.index({
  user: 1,
  expenseDate: 1,
});

const expenseModel = mongoose.model("Expense", expenseSchema);

module.exports = expenseModel;
