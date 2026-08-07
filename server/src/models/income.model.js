const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    source: {
      type: String,
      required: true,
      enum: [
        "Salary",
        "Freelancing",
        "Business",
        "Investment",
        "Rental",
        "Gift",
        "Others",
      ],
    },

    receivedFrom: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    incomeDate: {
      type: Date,
      required: true,
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

const incomeModel = mongoose.model("Income", incomeSchema);

module.exports = incomeModel;
