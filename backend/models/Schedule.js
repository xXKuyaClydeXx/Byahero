import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Make sure to reference User model here for driver info
      required: true,
    },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: String, required: true },
    seats: { type: Number, required: true },
    vehicle: { type: String, default: "Van" },
    terminal: { type: String, required: true },  // Store "from" as terminal
  },
  { timestamps: true }
);

export default mongoose.model("Schedule", ScheduleSchema);