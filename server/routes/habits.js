const router = require("express").Router();
const auth = require("../middleware/auth");
const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");

router.use(auth);

router.get("/", async (req, res) => {
  const habits = await Habit.find({ userId: req.user._id });
  res.send(habits);
});

router.post("/", async (req, res) => {
  const habit = new Habit({ ...req.body, userId: req.user._id });
  await habit.save();
  res.status(201).send(habit);
});

router.patch("/:id", async (req, res) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );
  res.send(habit);
});

router.delete("/:id", async (req, res) => {
  await Habit.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.sendStatus(204);
});

router.post("/:id/log", async (req, res) => {
  const log = new HabitLog({
    habitId: req.params.id,
    date: new Date(), // lub req.body.date
    completed: true,
  });
  await log.save();
  res.status(201).send(log);
});

router.get("/:id/logs", async (req, res) => {
  const logs = await HabitLog.find({ habitId: req.params.id });
  res.send(logs);
});

module.exports = router;
