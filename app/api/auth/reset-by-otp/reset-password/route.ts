// // // import { type NextRequest, NextResponse } from "next/server"
// // // import bcrypt from "bcryptjs"
// // // import dbConnect from "@/lib/mongodb"
// // // import User from "@/lib/models/User"
// // // import Doctor from "@/lib/models/Doctor"
// // // import Hospital from "@/lib/models/Hospital"
// // // import OTP from "@/lib/models/OTP"
// // // import { sendPasswordChangeConfirmation } from "@/lib/verification/sendPasswordChangeConfirmation"


// // // export async function POST(request: NextRequest) {
// // //   try {
// // //     const { email, otp, newPassword } = await request.json()

// // //     console.log("\nReset Password Request:", { email, otp, newPassword })

// // //     if (!email || !otp || !newPassword) {
// // //       return NextResponse.json({ error: "Email, OTP, and new password are required" }, { status: 400 })
// // //     }

// // //     if (newPassword.length < 6) {
// // //       return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
// // //     }

// // //     await dbConnect()

// // //     // Verify OTP one more time for security
// // //     const otpRecord = await OTP.findOne({ email, otp })
// // //     if (!otpRecord) {
// // //       return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
// // //     }

// // //     // Hash the new password
// // //     const saltRounds = 12
// // //     const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

// // //     // Find and update the user's password based on their role
// // //     let updateResult = null
// // //     const userRole = otpRecord.role

// // //     if (userRole === "user") {
// // //       updateResult = await User.findOneAndUpdate(
// // //         { email },
// // //         { password: hashedPassword, updatedAt: new Date() },
// // //         { new: true },
// // //       )
// // //     } else if (userRole === "doctor") {
// // //       updateResult = await Doctor.findOneAndUpdate(
// // //         { email },
// // //         { password: hashedPassword, updatedAt: new Date() },
// // //         { new: true },
// // //       )
// // //     } else if (userRole === "hospital") {
// // //       updateResult = await Hospital.findOneAndUpdate(
// // //         { email },
// // //         { password: hashedPassword, updatedAt: new Date() },
// // //         { new: true },
// // //       )
// // //     }

// // //     if (!updateResult) {
// // //       return NextResponse.json({ error: "User not found or password update failed" }, { status: 404 })
// // //     }

// // //     // Delete the OTP after successful password reset
// // //     await OTP.deleteOne({ _id: otpRecord._id })

// // //     // Send confirmation email
// // //     try {
// // //       await sendPasswordChangeConfirmation(email, userRole)
// // //     } catch (emailError) {
// // //       console.error("Failed to send confirmation email:", emailError)
// // //       // Don't fail the request if email fails
// // //     }

// // //     return NextResponse.json(
// // //       {
// // //         message: "Password reset successfully",
// // //         role: userRole,
// // //       },
// // //       { status: 200 },
// // //     )
// // //   } catch (error) {
// // //     console.error("Reset password error:", error)
// // //     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
// // //   }
// // // }


// // import { type NextRequest, NextResponse } from "next/server"
// // import bcrypt from "bcryptjs"
// // import dbConnect from "@/lib/mongodb"
// // import User from "@/lib/models/User"
// // import Doctor from "@/lib/models/Doctor"
// // import Hospital from "@/lib/models/Hospital"
// // import OTP from "@/lib/models/OTP"
// // import { sendPasswordChangeConfirmation } from "@/lib/verification/sendPasswordChangeConfirmation"

// // export async function POST(request: NextRequest) {
// //   try {
// //     const { email, otp, newPassword } = await request.json()

// //     console.log("\n🔄 Reset Password Request:", {
// //       email,
// //       otp,
// //       passwordLength: newPassword?.length,
// //     })

// //     if (!email || !otp || !newPassword) {
// //       console.log("❌ Missing required fields")
// //       return NextResponse.json({ error: "Email, OTP, and new password are required" }, { status: 400 })
// //     }

// //     if (newPassword.length < 6) {
// //       console.log("❌ Password too short")
// //       return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
// //     }

// //     await dbConnect()
// //     console.log("✅ Database connected")

// //     // Verify OTP one more time for security
// //     const otpRecord = await OTP.findOne({ email, otp })
// //     console.log("🔍 OTP Record found:", otpRecord ? "Yes" : "No")

// //     if (!otpRecord) {
// //       console.log("❌ Invalid or expired OTP")
// //       return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
// //     }

// //     console.log("✅ OTP verified, User role:", otpRecord.role)

// //     // Hash the new password
// //     const saltRounds = 12
// //     const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
// //     console.log("✅ Password hashed")

// //     // Find and update the user's password based on their role
// //     let updateResult = null
// //     const userRole = otpRecord.role

// //     try {
// //       if (userRole === "user") {
// //         console.log("🔍 Updating User collection...")
// //         updateResult = await User.findOneAndUpdate(
// //           { email },
// //           { password: hashedPassword, updatedAt: new Date() },
// //           { new: true },
// //         )
// //       } else if (userRole === "doctor") {
// //         console.log("🔍 Updating Doctor collection...")
// //         updateResult = await Doctor.findOneAndUpdate(
// //           { email },
// //           { password: hashedPassword, updatedAt: new Date() },
// //           { new: true },
// //         )
// //       } else if (userRole === "hospital") {
// //         console.log("🔍 Updating Hospital collection...")
// //         updateResult = await Hospital.findOneAndUpdate(
// //           { email },
// //           { password: hashedPassword, updatedAt: new Date() },
// //           { new: true },
// //         )
// //       }

// //       console.log("🔍 Update result:", updateResult ? "Success" : "Failed")
// //     } catch (updateError) {
// //       console.error("❌ Update error:", updateError)
// //       return NextResponse.json({ error: "Failed to update password" }, { status: 500 })
// //     }

// //     if (!updateResult) {
// //       console.log("❌ User not found or password update failed")
// //       return NextResponse.json({ error: "User not found or password update failed" }, { status: 404 })
// //     }

// //     // Delete the OTP after successful password reset
// //     try {
// //       await OTP.deleteOne({ _id: otpRecord._id })
// //       console.log("✅ OTP record deleted")
// //     } catch (deleteError) {
// //       console.error("⚠️ Failed to delete OTP:", deleteError)
// //     }

// //     // Send confirmation email
// //     try {
// //       await sendPasswordChangeConfirmation(email, userRole)
// //       console.log("✅ Confirmation email sent")
// //     } catch (emailError) {
// //       console.error("⚠️ Failed to send confirmation email:", emailError)
// //       // Don't fail the request if email fails
// //     }

// //     console.log("🎉 Password reset successful!")
// //     return NextResponse.json(
// //       {
// //         message: "Password reset successfully",
// //         role: userRole,
// //       },
// //       { status: 200 },
// //     )
// //   } catch (error) {
// //     console.error("💥 Reset password error:", error)
// //     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
// //   }
// // }







// import { type NextRequest, NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import dbConnect from "@/lib/mongodb"
// import User from "@/lib/models/User"
// import Doctor from "@/lib/models/Doctor"
// import Hospital from "@/lib/models/Hospital"
// import OTP from "@/lib/models/OTP"

// export async function POST(request: NextRequest) {
//   try {
//     const { email, otp, newPassword } = await request.json()

//     console.log("\n🔄 Reset Password Request:", {
//       email,
//       otp,
//       passwordLength: newPassword?.length,
//     })

//     if (!email || !otp || !newPassword) {
//       console.log("❌ Missing required fields")
//       return NextResponse.json({ error: "Email, OTP, and new password are required" }, { status: 400 })
//     }

//     if (newPassword.length < 6) {
//       console.log("❌ Password too short")
//       return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
//     }

//     await dbConnect()
//     console.log("✅ Database connected")

//     // Verify OTP one more time for security
//     const otpRecord = await OTP.findOne({ email, otp })
//     console.log("🔍 OTP Record found:", otpRecord ? "Yes" : "No")

//     if (!otpRecord) {
//       console.log("❌ Invalid or expired OTP")
//       return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
//     }

//     console.log("✅ OTP verified, User role:", otpRecord.role)

//     // Hash the new password
//     const saltRounds = 12
//     const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
//     console.log("✅ Password hashed")

//     // Find and update the user's password based on their role
//     let updateResult = null
//     const userRole = otpRecord.role

//     try {
//       if (userRole === "user") {
//         console.log("🔍 Updating User collection...")
//         updateResult = await User.findOneAndUpdate(
//           { email },
//           { password: hashedPassword, updatedAt: new Date() },
//           { new: true },
//         )
//       } else if (userRole === "doctor") {
//         console.log("🔍 Updating Doctor collection...")
//         updateResult = await Doctor.findOneAndUpdate(
//           { email },
//           { password: hashedPassword, updatedAt: new Date() },
//           { new: true },
//         )
//       } else if (userRole === "hospital") {
//         console.log("🔍 Updating Hospital collection...")
//         updateResult = await Hospital.findOneAndUpdate(
//           { email },
//           { password: hashedPassword, updatedAt: new Date() },
//           { new: true },
//         )
//       }

//       console.log("🔍 Update result:", updateResult ? "Success" : "Failed")
//     } catch (updateError) {
//       console.error("❌ Update error:", updateError)
//       return NextResponse.json({ error: "Failed to update password" }, { status: 500 })
//     }

//     if (!updateResult) {
//       console.log("❌ User not found or password update failed")
//       return NextResponse.json({ error: "User not found or password update failed" }, { status: 404 })
//     }

//     // Delete the OTP after successful password reset
//     try {
//       await OTP.deleteOne({ _id: otpRecord._id })
//       console.log("✅ OTP record deleted")
//     } catch (deleteError) {
//       console.error("⚠️ Failed to delete OTP:", deleteError)
//     }

//     console.log("🎉 Password reset successful!")
//     return NextResponse.json(
//       {
//         message: "Password reset successfully! Please login with your new password.",
//         role: userRole,
//       },
//       { status: 200 },
//     )
//   } catch (error) {
//     console.error("💥 Reset password error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }


import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"
import OTP from "@/lib/models/OTP"

export async function POST(request: NextRequest) {
  try {
    const { email, otp, newPassword } = await request.json()

    console.log("\n🔄 Reset Password Request:", {
      email,
      otp,
      passwordLength: newPassword?.length,
    })

    if (!email || !otp || !newPassword) {
      console.log("❌ Missing required fields")
      return NextResponse.json({ error: "Email, OTP, and new password are required" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      console.log("❌ Password too short")
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    await dbConnect()
    console.log("✅ Database connected")

    // Debug: Check all OTP records for this email
    const allOtpRecords = await OTP.find({ email })
    console.log("🔍 All OTP records for email:", allOtpRecords)

    // Debug: Check if any OTP records exist at all
    const totalOtpRecords = await OTP.countDocuments()
    console.log("🔍 Total OTP records in database:", totalOtpRecords)

    // Verify OTP one more time for security
    const otpRecord = await OTP.findOne({ email, otp })
    console.log("🔍 OTP Record found:", otpRecord ? "Yes" : "No")

    if (otpRecord) {
      console.log("✅ OTP Record details:", {
        id: otpRecord._id,
        email: otpRecord.email,
        otp: otpRecord.otp,
        role: otpRecord.role,
        createdAt: otpRecord.createdAt,
        expiresAt: otpRecord.expiresAt,
      })
    }

    if (!otpRecord) {
      console.log("❌ Invalid or expired OTP")

      // Additional debugging - check if OTP exists with different case or whitespace
      const otpRecordCaseInsensitive = await OTP.findOne({
        email: { $regex: new RegExp(`^${email}$`, "i") },
        otp: otp.toString().trim(),
      })
      console.log("🔍 Case insensitive OTP search:", otpRecordCaseInsensitive ? "Found" : "Not found")

      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
    }

    console.log("✅ OTP verified, User role:", otpRecord.role)

    // Hash the new password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
    console.log("✅ Password hashed")

    // Find and update the user's password based on their role
    let updateResult = null
    const userRole = otpRecord.role

    try {
      if (userRole === "user") {
        console.log("🔍 Updating User collection...")
        updateResult = await User.findOneAndUpdate(
          { email },
          { password: hashedPassword, updatedAt: new Date() },
          { new: true },
        )
      } else if (userRole === "doctor") {
        console.log("🔍 Updating Doctor collection...")
        updateResult = await Doctor.findOneAndUpdate(
          { email },
          { password: hashedPassword, updatedAt: new Date() },
          { new: true },
        )
      } else if (userRole === "hospital") {
        console.log("🔍 Updating Hospital collection...")
        updateResult = await Hospital.findOneAndUpdate(
          { email },
          { password: hashedPassword, updatedAt: new Date() },
          { new: true },
        )
      }

      console.log("🔍 Update result:", updateResult ? "Success" : "Failed")
    } catch (updateError) {
      console.error("❌ Update error:", updateError)
      return NextResponse.json({ error: "Failed to update password" }, { status: 500 })
    }

    if (!updateResult) {
      console.log("❌ User not found or password update failed")
      return NextResponse.json({ error: "User not found or password update failed" }, { status: 404 })
    }

    // Delete the OTP after successful password reset
    try {
      await OTP.deleteOne({ _id: otpRecord._id })
      console.log("✅ OTP record deleted")
    } catch (deleteError) {
      console.error("⚠️ Failed to delete OTP:", deleteError)
    }

    console.log("🎉 Password reset successful!")
    return NextResponse.json(
      {
        message: "Password reset successfully! Please login with your new password.",
        role: userRole,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("💥 Reset password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
