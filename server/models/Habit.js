const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  description: String,
  frequency: String, // np. "daily"
});

module.exports = mongoose.model("Habit", habitSchema);
