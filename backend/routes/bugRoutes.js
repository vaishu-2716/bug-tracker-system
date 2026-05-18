const express = require("express");
const Bug = require("../models/bug");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const bug = await Bug.create(req.body);
  res.json(bug);
});

router.get("/", protect, async (req, res) => {
  const bugs = await Bug.find();
  res.json(bugs);
});

router.put("/:id", protect, async (req, res) => {
  const updatedBug = await Bug.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedBug);
});

router.delete("/:id", protect, async (req, res) => {
  await Bug.findByIdAndDelete(req.params.id);

  res.json({
    message: "Bug deleted successfully"
  });
});

module.exports = router;