import mongoose from "mongoose"

const assessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true, enum: ["phq9", "gad7", "stress", "wellness"] },
  responses: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
      score: { type: Number, required: true },
    },
  ],
  score: { type: Number, required: true },
  result: {
    level: { type: String, required: true },
    description: { type: String, required: true },
    recommendations: [{ type: String }],
  },
  completedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema)
