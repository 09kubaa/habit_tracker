const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).send("Invalid credentials.");

    const token = user.generateAuthToken();
    res.send({ token });
  } catch {
    res.status(500).send("Server error");
  }
});

module.exports = router;
