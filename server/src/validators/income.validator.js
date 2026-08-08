const { body, validationResult } = require("express-validator");

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

const incomeValidator = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount should be greater than 0")
    .toFloat(),

  body("source")
    .notEmpty()
    .withMessage("Source is required")
    .isIn([
      "Salary",
      "Freelancing",
      "Business",
      "Investment",
      "Rental",
      "Gift",
      "Others",
    ])
    .withMessage("Invalid source type"),

  body("receivedFrom")
    .trim()
    .notEmpty()
    .withMessage("Received From is required")
    .isLength({ max: 100 })
    .withMessage("Received From cannot exceed 100 characters only"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description cannot exceed 200 characters only"),

  body("incomeDate")
    .notEmpty()
    .withMessage("Income Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),

  validateRequest,
];

const updateIncomeValidator = [
  body("amount")
    .optional()
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount should be greater than 0")
    .toFloat(),

  body("source")
    .optional()
    .notEmpty()
    .withMessage("Source is required")
    .isIn([
      "Salary",
      "Freelancing",
      "Business",
      "Investment",
      "Rental",
      "Gift",
      "Others",
    ])
    .withMessage("Invalid source type"),

  body("receivedFrom")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Received From is required")
    .isLength({ max: 100 })
    .withMessage("Received From cannot exceed 100 characters only"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description cannot exceed 200 characters only"),

  body("incomeDate")
    .optional()
    .notEmpty()
    .withMessage("Income Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),

  validateRequest,
];

module.exports = { incomeValidator, updateIncomeValidator };
