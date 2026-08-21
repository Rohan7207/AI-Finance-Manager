const mongoose = require("mongoose");

const passwordResetTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    used: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const passwordResetTokenModel = mongoose.model(
  "PasswordResetToken",
  passwordResetTokenSchema,
);

module.exports = passwordResetTokenModel;
