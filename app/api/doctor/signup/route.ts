import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import Doctor from "@/lib/models/Doctor"
import BlockedList from "@/lib/models/BlockedList"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const doctorData = await request.json()

    // Check if doctor is blocked
    const blockedUser = await BlockedList.findOne({
      $or: [{ email: doctorData.email }, { phone: doctorData.phone }],
    })

    if (blockedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. Please contact admin if this is a mistake.",
        },
        { status: 403 },
      )
    }

    // Check if doctor already exists
    let existingDoctor = await Doctor.findOne({
      $or: [{ email: doctorData.email }, { phone: doctorData.phone }],
    })

    // Hash password
    const hashedPassword = await bcrypt.hash(doctorData.password, 12)

    if (existingDoctor && !existingDoctor.isVerified) {
      // Update existing unverified doctor
      existingDoctor.name = doctorData.name
      existingDoctor.phone = doctorData.phone
      existingDoctor.password = hashedPassword
      existingDoctor.specialty = doctorData.specialty
      existingDoctor.address = doctorData.address
      existingDoctor.isVerified = true
      await existingDoctor.save()

      existingDoctor = existingDoctor.toObject()
    } else if (existingDoctor && existingDoctor.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Doctor already exists with this email or phone",
        },
        { status: 400 },
      )
    } else {
      // Create new doctor
      existingDoctor = await Doctor.create({
        ...doctorData,
        password: hashedPassword,
        isVerified: true,
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: existingDoctor._id,
        email: existingDoctor.email,
        role: "doctor",
        isAdmin: false,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" },
    )

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Doctor account created successfully",
      user: {
        id: existingDoctor._id,
        name: existingDoctor.name,
        email: existingDoctor.email,
        role: "doctor",
        isAdmin: false,
      },
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })

    return response
  } catch (error) {
    console.error("Doctor signup error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
