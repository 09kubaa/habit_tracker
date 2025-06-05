const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).send("Email already used.");

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hash });
    await user.save();

    res.status(201).send("User created.");
  } catch {
    res.status(500).send("Server error");
  }
});

module.exports = router;
