const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Imię jest wymagane"],
    trim: true,
    minlength: [2, "Imię musi mieć przynajmniej 2 znaki"],
  },
  lastName: {
    type: String,
    required: [true, "Nazwisko jest wymagane"],
    trim: true,
    minlength: [2, "Nazwisko musi mieć przynajmniej 2 znaki"],
  },
  email: {
    type: String,
    required: [true, "Email jest wymagany"],
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Niepoprawny format adresu email"],
  },
  password: {
    type: String,
    required: [true, "Hasło jest wymagane"],
    minlength: [6, "Hasło musi mieć przynajmniej 6 znaków"],
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = mongoose.model("User", userSchema);
