import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import BlockedList from "@/lib/models/BlockedList"
import { createOtp } from "@/lib/verification/createOtp"
import { sendEmailToStakeholder } from "@/lib/verification/sendEmailToStakeholder"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { email, role } = await request.json()

    // Check if email is blocked
    const blockedUser = await BlockedList.findOne({ email })
    if (blockedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. Please contact admin if this is a mistake.",
        },
        { status: 403 },
      )
    }

    // Generate and send OTP
    const otp = await createOtp(email, role)
    const emailResult = await sendEmailToStakeholder(email, otp, role)

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: "OTP sent successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send OTP",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
