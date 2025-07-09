import mongoose from "mongoose"

const moodEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: Number, min: 1, max: 10, required: true }, // 1-10 scale
  energy: { type: Number, min: 1, max: 10, required: true },
  anxiety: { type: Number, min: 1, max: 10, required: true },
  sleep: { type: Number, min: 0, max: 12, required: true }, // hours
  notes: { type: String, maxLength: 500 },
  behaviorData: {
    screenTime: { type: Number }, // minutes
    missedCalls: { type: Number },
    steps: { type: Number },
    socialInteraction: { type: Number, min: 1, max: 10 },
  },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.MoodEntry || mongoose.model("MoodEntry", moodEntrySchema)
