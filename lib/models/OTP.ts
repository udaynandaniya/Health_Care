// import mongoose from "mongoose"

// const otpSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   otp: { type: String, required: true },
//   role: { type: String, required: true },
//   expiresAt: { type: Date, default: Date.now, expires: 300 }, // 5 minutes
// })

// export default mongoose.models.OTP || mongoose.model("OTP", otpSchema)


import mongoose from "mongoose"

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "doctor", "hospital"],
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from creation
      expires: 0, // MongoDB will automatically delete expired documents
    },
  },
  {
    timestamps: true,
  },
)

// Create index for faster queries
OTPSchema.index({ email: 1, otp: 1 })
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema)
