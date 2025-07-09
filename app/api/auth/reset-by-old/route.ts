// // import { type NextRequest, NextResponse } from "next/server"
// // import bcrypt from "bcryptjs"
// // import dbConnect from "@/lib/mongodb"
// // import User from "@/lib/models/User"
// // import Doctor from "@/lib/models/Doctor"
// // import Hospital from "@/lib/models/Hospital"
// // import { sendPasswordChangeConfirmation } from "@/lib/verification/sendPasswordChangeConfirmation"

// // export async function POST(request: NextRequest) {
// //   try {
// //     const { email, role, oldPassword, newPassword } = await request.json()

// //     // Validation
// //     if (!email || !oldPassword || !newPassword) {
// //       return NextResponse.json(
// //         {
// //           error: "Email, old password, and new password are required",
// //         },
// //         { status: 400 },
// //       )
// //     }

// //     if (newPassword.length < 6) {
// //       return NextResponse.json(
// //         {
// //           error: "New password must be at least 6 characters long",
// //         },
// //         { status: 400 },
// //       )
// //     }

// //     if (oldPassword === newPassword) {
// //       return NextResponse.json(
// //         {
// //           error: "New password must be different from the old password",
// //         },
// //         { status: 400 },
// //       )
// //     }

// //     await dbConnect()

// //     // Find user across all collections if role not specified
// //     let user = null
// //     let userRole = ""
// //     let UserModel = null

// //     if (role) {
// //       // If role is specified, search in specific collection
// //       switch (role) {
// //         case "user":
// //           UserModel = User
// //           userRole = "user"
// //           break
// //         case "doctor":
// //           UserModel = Doctor
// //           userRole = "doctor"
// //           break
// //         case "hospital":
// //           UserModel = Hospital
// //           userRole = "hospital"
// //           break
// //         default:
// //           return NextResponse.json({ error: "Invalid role specified" }, { status: 400 })
// //       }
// //       user = await UserModel.findOne({ email })
// //     } else {
// //       // Search across all collections
// //       const userCheck = await User.findOne({ email })
// //       const doctorCheck = await Doctor.findOne({ email })
// //       const hospitalCheck = await Hospital.findOne({ email })

// //       if (userCheck) {
// //         user = userCheck
// //         userRole = "user"
// //         UserModel = User
// //       } else if (doctorCheck) {
// //         user = doctorCheck
// //         userRole = "doctor"
// //         UserModel = Doctor
// //       } else if (hospitalCheck) {
// //         user = hospitalCheck
// //         userRole = "hospital"
// //         UserModel = Hospital
// //       }
// //     }

// //     if (!user) {
// //       return NextResponse.json(
// //         {
// //           error: "No account found with this email address",
// //         },
// //         { status: 404 },
// //       )
// //     }

// //     // Verify old password
// //     const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password)

// //     if (!isOldPasswordValid) {
// //       return NextResponse.json(
// //         {
// //           error: "Current password is incorrect",
// //         },
// //         { status: 401 },
// //       )
// //     }

// //     // Hash the new password
// //     const saltRounds = 12
// //     const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

// //     // Update the password
// //     const updateResult = await UserModel.findOneAndUpdate(
// //       { email },
// //       {
// //         password: hashedNewPassword,
// //         updatedAt: new Date(),
// //       },
// //       { new: true },
// //     )

// //     if (!updateResult) {
// //       return NextResponse.json(
// //         {
// //           error: "Failed to update password",
// //         },
// //         { status: 500 },
// //       )
// //     }

// //     // Send confirmation email
// //     try {
// //       await sendPasswordChangeConfirmation(email, userRole)
// //     } catch (emailError) {
// //       console.error("Failed to send confirmation email:", emailError)
// //       // Don't fail the request if email fails
// //     }

// //     return NextResponse.json(
// //       {
// //         message: "Password updated successfully",
// //         role: userRole,
// //       },
// //       { status: 200 },
// //     )
// //   } catch (error) {
// //     console.error("Reset password by old password error:", error)
// //     return NextResponse.json(
// //       {
// //         error: "Internal server error",
// //       },
// //       { status: 500 },
// //     )
// //   }
// // }

// import { type NextRequest, NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import dbConnect from "@/lib/mongodb"
// import User from "@/lib/models/User"
// import Doctor from "@/lib/models/Doctor"
// import Hospital from "@/lib/models/Hospital"
// import { sendPasswordChangeConfirmation } from "@/lib/verification/sendPasswordChangeConfirmation"

// export async function POST(request: NextRequest) {
//   try {
//     const { email, role, oldPassword, newPassword } = await request.json()

//     console.log("\n🔄 Reset by Old Password Request:", {
//       email,
//       role,
//       hasOldPassword: !!oldPassword,
//       newPasswordLength: newPassword?.length,
//     })

//     // Validation
//     if (!email || !oldPassword || !newPassword) {
//       console.log("❌ Missing required fields")
//       return NextResponse.json(
//         {
//           error: "Email, old password, and new password are required",
//         },
//         { status: 400 },
//       )
//     }

//     if (newPassword.length < 6) {
//       console.log("❌ Password too short")
//       return NextResponse.json(
//         {
//           error: "New password must be at least 6 characters long",
//         },
//         { status: 400 },
//       )
//     }

//     if (oldPassword === newPassword) {
//       console.log("❌ Same password")
//       return NextResponse.json(
//         {
//           error: "New password must be different from the old password",
//         },
//         { status: 400 },
//       )
//     }

//     await dbConnect()
//     console.log("✅ Database connected")

//     // Find user across all collections if role not specified
//     let user = null
//     let userRole = ""
//     let UserModel = null

//     if (role) {
//       // If role is specified, search in specific collection
//       switch (role) {
//         case "user":
//           UserModel = User
//           userRole = "user"
//           break
//         case "doctor":
//           UserModel = Doctor
//           userRole = "doctor"
//           break
//         case "hospital":
//           UserModel = Hospital
//           userRole = "hospital"
//           break
//         default:
//           return NextResponse.json({ error: "Invalid role specified" }, { status: 400 })
//       }
//       user = await UserModel.findOne({ email })
//       console.log(`🔍 Searched in ${role} collection:`, user ? "Found" : "Not found")
//     } else {
//       // Search across all collections
//       console.log("🔍 Searching across all collections...")
//       const userCheck = await User.findOne({ email })
//       const doctorCheck = await Doctor.findOne({ email })
//       const hospitalCheck = await Hospital.findOne({ email })

//       if (userCheck) {
//         user = userCheck
//         userRole = "user"
//         UserModel = User
//         console.log("✅ Found in User collection")
//       } else if (doctorCheck) {
//         user = doctorCheck
//         userRole = "doctor"
//         UserModel = Doctor
//         console.log("✅ Found in Doctor collection")
//       } else if (hospitalCheck) {
//         user = hospitalCheck
//         userRole = "hospital"
//         UserModel = Hospital
//         console.log("✅ Found in Hospital collection")
//       }
//     }

//     if (!user) {
//       console.log("❌ No account found")
//       return NextResponse.json(
//         {
//           error: "No account found with this email address",
//         },
//         { status: 404 },
//       )
//     }

//     // Verify old password
//     const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password)
//     console.log("🔍 Old password valid:", isOldPasswordValid)

//     if (!isOldPasswordValid) {
//       console.log("❌ Invalid old password")
//       return NextResponse.json(
//         {
//           error: "Current password is incorrect",
//         },
//         { status: 401 },
//       )
//     }

//     // Hash the new password
//     const saltRounds = 12
//     const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)
//     console.log("✅ New password hashed")

//     // Update the password
//     const updateResult = await UserModel.findOneAndUpdate(
//       { email },
//       {
//         password: hashedNewPassword,
//         updatedAt: new Date(),
//       },
//       { new: true },
//     )

//     console.log("🔍 Password update:", updateResult ? "Success" : "Failed")

//     if (!updateResult) {
//       return NextResponse.json(
//         {
//           error: "Failed to update password",
//         },
//         { status: 500 },
//       )
//     }

//     // Send confirmation email
//     try {
//       await sendPasswordChangeConfirmation(email, userRole)
//       console.log("✅ Confirmation email sent")
//     } catch (emailError) {
//       console.error("⚠️ Failed to send confirmation email:", emailError)
//       // Don't fail the request if email fails
//     }

//     console.log("🎉 Password reset by old password successful!")
//     return NextResponse.json(
//       {
//         message: "Password updated successfully",
//         role: userRole,
//       },
//       { status: 200 },
//     )
//   } catch (error) {
//     console.error("💥 Reset password by old password error:", error)
//     return NextResponse.json(
//       {
//         error: "Internal server error",
//       },
//       { status: 500 },
//     )
//   }
// }


import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"

export async function POST(request: NextRequest) {
  try {
    const { email, role, oldPassword, newPassword } = await request.json()

    console.log("\n🔄 Reset by Old Password Request:", {
      email,
      role,
      hasOldPassword: !!oldPassword,
      newPasswordLength: newPassword?.length,
    })

    // Validation
    if (!email || !oldPassword || !newPassword) {
      console.log("❌ Missing required fields")
      return NextResponse.json(
        {
          error: "Email, old password, and new password are required",
        },
        { status: 400 },
      )
    }

    if (newPassword.length < 6) {
      console.log("❌ Password too short")
      return NextResponse.json(
        {
          error: "New password must be at least 6 characters long",
        },
        { status: 400 },
      )
    }

    if (oldPassword === newPassword) {
      console.log("❌ Same password")
      return NextResponse.json(
        {
          error: "New password must be different from the old password",
        },
        { status: 400 },
      )
    }

    await dbConnect()
    console.log("✅ Database connected")

    // Find user across all collections if role not specified
    let user = null
    let userRole = ""
    let UserModel = null

    if (role) {
      // If role is specified, search in specific collection
      switch (role) {
        case "user":
          UserModel = User
          userRole = "user"
          break
        case "doctor":
          UserModel = Doctor
          userRole = "doctor"
          break
        case "hospital":
          UserModel = Hospital
          userRole = "hospital"
          break
        default:
          return NextResponse.json({ error: "Invalid role specified" }, { status: 400 })
      }
      user = await UserModel.findOne({ email })
      console.log(`🔍 Searched in ${role} collection:`, user ? "Found" : "Not found")
    } else {
      // Search across all collections
      console.log("🔍 Searching across all collections...")
      const userCheck = await User.findOne({ email })
      const doctorCheck = await Doctor.findOne({ email })
      const hospitalCheck = await Hospital.findOne({ email })

      if (userCheck) {
        user = userCheck
        userRole = "user"
        UserModel = User
        console.log("✅ Found in User collection")
      } else if (doctorCheck) {
        user = doctorCheck
        userRole = "doctor"
        UserModel = Doctor
        console.log("✅ Found in Doctor collection")
      } else if (hospitalCheck) {
        user = hospitalCheck
        userRole = "hospital"
        UserModel = Hospital
        console.log("✅ Found in Hospital collection")
      }
    }

    if (!user) {
      console.log("❌ No account found")
      return NextResponse.json(
        {
          error: "No account found with this email address",
        },
        { status: 404 },
      )
    }

    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password)
    console.log("🔍 Old password valid:", isOldPasswordValid)

    if (!isOldPasswordValid) {
      console.log("❌ Invalid old password")
      return NextResponse.json(
        {
          error: "Current password is incorrect",
        },
        { status: 401 },
      )
    }

    // Hash the new password
    const saltRounds = 12
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)
    console.log("✅ New password hashed")

    // Update the password
    const updateResult = await UserModel.findOneAndUpdate(
      { email },
      {
        password: hashedNewPassword,
        updatedAt: new Date(),
      },
      { new: true },
    )

    console.log("🔍 Password update:", updateResult ? "Success" : "Failed")

    if (!updateResult) {
      return NextResponse.json(
        {
          error: "Failed to update password",
        },
        { status: 500 },
      )
    }

    console.log("🎉 Password reset by old password successful!")
    return NextResponse.json(
      {
        message: "Password updated successfully! Please login with your new password.",
        role: userRole,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("💥 Reset password by old password error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
