const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,

  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"]
  },

  severity: {
    type: String,
    enum: ["Minor", "Major", "Critical"]
  },

  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved", "Closed"],
    default: "Open"
  },

  assignedTo: String

}, { timestamps: true });

module.exports = mongoose.model("Bug", bugSchema);