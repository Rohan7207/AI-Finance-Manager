const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.route");
const expenseRoutes = require("./routes/expense.route");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/users", authRoutes);
app.use("/expenses", expenseRoutes);

module.exports = app;
