import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  role: { type: String, required: true },
  expiresAt: { type: Date, default: Date.now, expires: 300 }, // 5 minutes
})

export default mongoose.models.OTP || mongoose.model("OTP", otpSchema)
