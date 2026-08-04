const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/users", authRoutes);

module.exports = app;
