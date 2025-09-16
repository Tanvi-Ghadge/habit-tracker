import Habit from "../models/Habit.js";
import CheckIn from "../models/CheckIn.js";

// ---------------- HABIT CRUD ----------------

export const createHabit = async (req, res) => {
  try {
    const { name, category, frequency, startDate, group, challenge } = req.body;

    if (!name || !category || !frequency) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const habit = new Habit({
      user: req.user._id,
      name: name.trim(),
      category,
      frequency,
      startDate,
      group,
      challenge,
    });

    await habit.save();
    return res.status(201).json(habit);
  } catch (error) {
    console.error("Habit creation error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "You already have a habit with this name",
      });
    }

    // 🔹 Validation errors (missing/invalid fields from schema)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    // 🔹 Fallback for unexpected errors
    return res
      .status(500)
      .json({ message: "Something went wrong while creating habit" });
  }
};

export const getHabits = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { user: req.user._id };
    if (category) filter.category = category;

    const habits = await Habit.find(filter).sort({ createdAt: -1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  CHECK-IN ----------------

export const checkInHabit = async (req, res) => {
  try {
    const { habitId } = req.body;
    const habit = await Habit.findOne({ _id: habitId, user: req.user._id });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    let checkInDate = new Date();

    // Normalize check-in date based on frequency
    if (habit.frequency === "daily") {
      checkInDate.setHours(0, 0, 0, 0);
    } else if (habit.frequency === "weekly") {
      const day = checkInDate.getDay(); // 0=Sun, 1=Mon
      const diff = checkInDate.getDate() - day + (day === 0 ? -6 : 1); // Monday
      checkInDate = new Date(checkInDate.setDate(diff));
      checkInDate.setHours(0, 0, 0, 0);
    }

    const checkIn = new CheckIn({
      habit: habit._id,
      user: req.user._id,
      date: checkInDate,
    });
    await checkIn.save();

    // ---------- Completion Rate ----------
    const totalCheckIns = await CheckIn.countDocuments({
      habit: habit._id,
      user: req.user._id,
    });
    let totalPeriods;
    if (habit.frequency === "daily") {
      totalPeriods = Math.ceil(
        (Date.now() - new Date(habit.startDate)) / (1000 * 60 * 60 * 24)
      );
    } else {
      totalPeriods = Math.ceil(
        (Date.now() - new Date(habit.startDate)) / (1000 * 60 * 60 * 24 * 7)
      );
    }
    habit.completionRate = Math.round((totalCheckIns / totalPeriods) * 100);

    // -----Streak Logic ----------
    if (habit.frequency === "daily") {
      const yesterday = new Date(checkInDate);
      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayCheckIn = await CheckIn.findOne({
        habit: habit._id,
        user: req.user._id,
        date: yesterday,
      });

      habit.streak =
        yesterdayCheckIn || totalCheckIns === 1 ? habit.streak + 1 : 1;
    } else if (habit.frequency === "weekly") {
      const lastWeek = new Date(checkInDate);
      lastWeek.setDate(lastWeek.getDate() - 7);

      const lastWeekCheckIn = await CheckIn.findOne({
        habit: habit._id,
        user: req.user._id,
        date: lastWeek,
      });

      habit.streak =
        lastWeekCheckIn || totalCheckIns === 1 ? habit.streak + 1 : 1;
    }

    await habit.save();

    res.status(201).json({ message: "Check-in recorded", habit });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Already checked in for this period" });
    }
    res.status(400).json({ message: error.message });
  }
};

// ------- HABIT PROGRESS ----------------

export const getHabitProgress = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const checkIns = await CheckIn.find({
      habit: habit._id,
      user: req.user._id,
    }).sort({ date: 1 });

    res.json({
      habit,
      streak: habit.streak,
      completionRate: habit.completionRate,
      totalCheckIns: checkIns.length,
      checkIns,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
