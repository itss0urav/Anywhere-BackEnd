const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const { connectDb } = require("./configs/db");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

//Routes
connectDb();
app.use(express.json())
app.use("/auth", authRoutes);

try {
  mongoose.connection.once("open", () => {
    console.log("Connected to  mongoDb database");
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
  });
} catch (err) {
  console.log("Unable to connect to database");
  throw new Error("Database connection failed");
}
