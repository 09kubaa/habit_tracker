const mongoose = require("mongoose");

const habitLogSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit",
    required: true,
  },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: true },
});

module.exports = mongoose.model("HabitLog", habitLogSchema);
