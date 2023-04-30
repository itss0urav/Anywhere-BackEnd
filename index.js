const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const { connectDb } = require("./configs/db");
const postRoutes = require("./routes/postRoutes");
const voteRoutes = require("./routes/voteRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userDataRoutes = require("./routes/userDataRoutes")
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/adminRoutes")
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
//Routes
connectDb();
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/vote", voteRoutes);
app.use("/comment", commentRoutes);
app.use("/userData", userDataRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
try {
  mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB database 🚀");
    app.listen(PORT, () => console.log(`Server started at port ${PORT} 😃`));
  });
} catch (err) {
  console.log("Unable to connect to database ⚠️");
  throw new Error("Database connection failed ⚠️");
}
