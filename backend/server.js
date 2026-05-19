const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const bugRoutes = require("./routes/bugRoutes");

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "https://bug-tracker-system-six.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Bug Tracker API Running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});