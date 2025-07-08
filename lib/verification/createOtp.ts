import dbConnect from "../mongodb"
import OTP from "../models/OTP"

export async function createOtp(email: string, role: string) {
  await dbConnect()

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  // Delete any existing OTP for this email
  await OTP.deleteMany({ email })

  // Create new OTP
  await OTP.create({ email, otp, role })

  return otp
}
