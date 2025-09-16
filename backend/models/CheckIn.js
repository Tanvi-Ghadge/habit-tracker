import mongoose from "mongoose";
const CheckInSchema = new mongoose.Schema({
  habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

CheckInSchema.index({ habit: 1, user: 1, date: 1 }, { unique: true }); // prevents multiple check-ins per day

const CheckIn = mongoose.model("CheckIn", CheckInSchema);
export default CheckIn;
