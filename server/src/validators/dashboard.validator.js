const { query, validationResult } = require("express-validator");

function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Invalid period", errors: errors.array() });
  }

  next();
}

module.exports.financialTrendValidator = [
  query("period")
    .isIn(["week", "month", "year"])
    .withMessage("Period must be week, month, or year"),

  validateRequest,
];
