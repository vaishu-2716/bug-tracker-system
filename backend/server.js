const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const bugRoutes = require("./routes/bugRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bug Tracker API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/bugs", bugRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});