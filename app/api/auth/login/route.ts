//C:\Users\UDAYN\Downloads\healthcare-platform\app\api\auth\login\route.ts


import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"
import BlockedList from "@/lib/models/BlockedList"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { email, password, role } = await request.json()

    // Check if user is blocked
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

    // Find user based on role
    let user
    let Model

    switch (role) {
      case "user":
        Model = User
        break
      case "doctor":
        Model = Doctor
        break
      case "hospital":
        Model = Hospital
        break
      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid role",
          },
          { status: 400 },
        )
    }

    user = await Model.findOne({ email })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      )
    }

    // Check if admin
    const isAdmin = email === process.env.ADMIN_EMAIL
    if (isAdmin) {
      user.isAdmin = true
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        isAdmin: isAdmin,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" },
    )
    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: isAdmin,
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
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
