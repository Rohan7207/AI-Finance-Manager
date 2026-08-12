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

  body("startDate")
    .notEmpty()
    .withMessage("Start Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  body("endDate")
    .notEmpty()
    .withMessage("End Date is required")
    .isISO8601()
    .withMessage("Invalid date format")
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error("End Date must be after Start Date");
      }

      return true;
    }),

  validateRequest,
];

const updateBudgetValidator = [
  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0")
    .toFloat(),

  body("startDate").optional().isISO8601().withMessage("Invalid date format"),

  body("endDate").optional().isISO8601().withMessage("Invalid date format"),

  validateRequest,
];

module.exports = { budgetValidator, updateBudgetValidator };
