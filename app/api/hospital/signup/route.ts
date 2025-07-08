import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import Hospital from "@/lib/models/Hospital"
import BlockedList from "@/lib/models/BlockedList"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const hospitalData = await request.json()

    // Check if hospital is blocked
    const blockedUser = await BlockedList.findOne({
      $or: [{ email: hospitalData.email }, { phone: hospitalData.phone }],
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

    // Check if hospital already exists
    let existingHospital = await Hospital.findOne({
      $or: [{ email: hospitalData.email }, { phone: hospitalData.phone }],
    })

    // Hash password
    const hashedPassword = await bcrypt.hash(hospitalData.password, 12)

    if (existingHospital && !existingHospital.isVerified) {
      // Update existing unverified hospital
      existingHospital.name = hospitalData.name
      existingHospital.phone = hospitalData.phone
      existingHospital.password = hashedPassword
      existingHospital.isHandleEmergency = hospitalData.isHandleEmergency
      existingHospital.address = hospitalData.address
      existingHospital.isVerified = true
      await existingHospital.save()

      existingHospital = existingHospital.toObject()
    } else if (existingHospital && existingHospital.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Hospital already exists with this email or phone",
        },
        { status: 400 },
      )
    } else {
      // Create new hospital
      existingHospital = await Hospital.create({
        ...hospitalData,
        password: hashedPassword,
        isVerified: true,
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: existingHospital._id,
        email: existingHospital.email,
        role: "hospital",
        isAdmin: false,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" },
    )

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Hospital account created successfully",
      user: {
        id: existingHospital._id,
        name: existingHospital.name,
        email: existingHospital.email,
        role: "hospital",
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
    console.error("Hospital signup error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
