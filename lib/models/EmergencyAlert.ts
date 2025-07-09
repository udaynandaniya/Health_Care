import mongoose from "mongoose"

const emergencyAlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number },
    address: {
      street: String,
      area: String,
      townOrVillage: String,
      taluka: String,
      district: String,
      pincode: String,
    },
  },
  message: { type: String, default: "Emergency assistance needed" },
  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending",
  },
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  isRead: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high", "critical"], default: "high" },
  createdAt: { type: Date, default: Date.now },
  respondedAt: { type: Date },
})

export default mongoose.models.EmergencyAlert || mongoose.model("EmergencyAlert", emergencyAlertSchema)
