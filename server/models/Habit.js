const mongoose = require("mongoose");

const allowedFrequencies = [
  "daily",
  "weekly",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Nazwa nawyku jest wymagana"],
    minlength: [3, "Nazwa musi mieć przynajmniej 3 znaki"],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [300, "Opis nie może przekraczać 300 znaków"],
    trim: true,
  },
  frequency: {
    type: String,
    required: [true, "Częstotliwość jest wymagana"],
    enum: {
      values: allowedFrequencies,
      message: "Nieprawidłowa częstotliwość",
    },
  },
});

module.exports = mongoose.model("Habit", habitSchema);
