import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["driver", "operator"],
      required: true
    },
    fullName: { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    birthday:       { type: Date },
    address:        { type: String },
    contactNumber:  { type: String },
    vehicleType:    { type: String },  
    routes:         { type: String },

    profileImageUrl: { type: String },
    licenseImageUrl: { type: String },
    orcrImageUrl:    { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
