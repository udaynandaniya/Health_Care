import mongoose from "mongoose"

const assessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["phq9", "gad7", "stress", "general"], required: true },
  responses: [
    {
      question: String,
      answer: Number,
      weight: Number,
    },
  ],
  score: { type: Number, required: true },
  severity: { type: String, enum: ["minimal", "mild", "moderate", "severe"], required: true },
  recommendations: [String],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema)
