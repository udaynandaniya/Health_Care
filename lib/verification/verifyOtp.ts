import dbConnect from "../mongodb"
import OTP from "../models/OTP"

export async function verifyOtp(email: string, otp: string) {
  await dbConnect()

  const otpRecord = await OTP.findOne({ email, otp })

  if (!otpRecord) {
    return { success: false, message: "Invalid or expired OTP" }
  }

  // Delete the OTP after successful verification
  await OTP.deleteOne({ _id: otpRecord._id })

  return { success: true }
}
