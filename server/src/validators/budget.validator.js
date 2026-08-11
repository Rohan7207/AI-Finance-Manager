const { body, validationResult } = require("express-validator");

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

const budgetValidator = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0")
    .toFloat(),

  body("month")
    .notEmpty()
    .withMessage("Month is required")
    .isNumeric()
    .withMessage("Month must be a number")
    .isInt({ min: 1, max: 12 })
    .withMessage("Month must be between 1 to 12"),

  body("year")
    .notEmpty()
    .withMessage("Year must be required")
    .isInt({ min: 1900, max: 2100 })
    .withMessage("Year must be between 1900 and 2100"),

  validateRequest,
];

const updateBudgetValidator = [
  body("amount")
    .optional()
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0")
    .toFloat(),

  body("month")
    .optional()
    .notEmpty()
    .withMessage("Month is required")
    .isNumeric()
    .withMessage("Month must be a number")
    .isInt({ min: 1, max: 12 })
    .withMessage("Month must be between 1 to 12"),

  body("year")
    .optional()
    .notEmpty()
    .withMessage("Year must be required")
    .isInt({ min: 1900, max: 2100 })
    .withMessage("Year must be between 1900 and 2100"),

  validateRequest,
];

module.exports = { budgetValidator, updateBudgetValidator };
