const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const bugRoutes = require("./routes/bugRoutes");

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5175",
    "http://localhost:5176",
    "https://bugtracker-vaishu.vercel.app",
    "https://bug-tracker-system-six.vercel.app",
    "https://bug-tracker-system-hjakb3p7r-vaishnavi-varma-s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);

app.get("/", (req, res) => {
  res.send("Bug Tracker API Running");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});