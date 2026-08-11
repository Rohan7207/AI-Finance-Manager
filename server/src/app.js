const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.route");
const expenseRoutes = require("./routes/expense.route");
const incomeRoutes = require("./routes/income.route");
const dashboardRoutes = require("./routes/dashboard.route");
const budgetRoutes = require("./routes/budget.route");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/users", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/incomes", incomeRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/budgets", budgetRoutes);

module.exports = app;
