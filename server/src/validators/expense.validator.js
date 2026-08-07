const { body, validationResult } = require("express-validator");

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

exports.expenseValidation = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is requires")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be grater than 0")
    .toFloat(),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "Food",
      "Travel",
      "Shopping",
      "Bills",
      "Health",
      "Education",
      "Entertainment",
      "Investment",
      "Others",
    ])
    .withMessage("Invalid category type"),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["Cash", "UPI", "Debit Card", "Credit Card", "Net Banking", "Wallet"])
    .withMessage("Invalid payment method"),

  body("expenseDate")
    .notEmpty()
    .withMessage("Expense Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description must be 200 characters only"),

  body("merchant")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Merchant name cannot exceed 100 characters"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),

  validateRequest,
];

exports.updateExpenseValidator = [
  body("amount")
    .optional()
    .notEmpty()
    .withMessage("Amount is requires")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be grater than 0")
    .toFloat(),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "Food",
      "Travel",
      "Shopping",
      "Bills",
      "Health",
      "Education",
      "Entertainment",
      "Investment",
      "Others",
    ])
    .withMessage("Invalid category type"),

  body("paymentMethod")
    .optional()
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["Cash", "UPI", "Debit Card", "Credit Card", "Net Banking", "Wallet"])
    .withMessage("Invalid payment method"),

  body("expenseDate")
    .optional()
    .notEmpty()
    .withMessage("Expense Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description must be 200 characters only"),

  body("merchant")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Merchant name cannot exceed 100 characters"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),

  validateRequest,
];
