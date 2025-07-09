import mongoose from "mongoose"

const healthTipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ["mental-health", "physical-health", "emergency", "prevention", "lifestyle"],
    required: true,
  },
  tags: [{ type: String }],
  authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  authorType: { type: String, enum: ["hospital", "doctor"], required: true },
  isApproved: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  createdAt: { type: Date, default: Date.now },
  approvedAt: { type: Date },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

export default mongoose.models.HealthTip || mongoose.model("HealthTip", healthTipSchema)
