import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  vehicle: { type: String, required: true },
  departureTime: String,
  price: Number,
});

export default mongoose.model("Trip", TripSchema);
