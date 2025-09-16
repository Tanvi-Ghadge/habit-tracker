import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "Health",
      "Fitness",
      "Nutrition",
      "Productivity",
      "Learning",
      "Mindfulness",
      "Social",
      "Hobbies",
      "Finance",
      "Other",
    ],
    default: "Other",
  },
  frequency: { type: String, enum: ["daily", "weekly"], required: true },
  startDate: { type: Date, default: Date.now },
  streak: { type: Number, default: 0 },
  completionRate: { type: Number, default: 0 }, // % of completed check-ins
  createdAt: { type: Date, default: Date.now },
});
HabitSchema.index({ user: 1, name: 1 }, { unique: true });
const Habit = mongoose.model("Habit", HabitSchema);
export default Habit;
