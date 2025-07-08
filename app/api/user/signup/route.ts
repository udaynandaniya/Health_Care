import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import BlockedList from "@/lib/models/BlockedList"

export async function POST(request: NextRequest) {
  console.log("i am at user signup route JWT_SECRET at runtime:", process.env.JWT_SECRET)

  try {
    await dbConnect()
    const userData = await request.json()

    // Check if user is blocked
    const blockedUser = await BlockedList.findOne({
      $or: [{ email: userData.email }, { phone: userData.phone }],
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

    // Check if user already exists
    let existingUser = await User.findOne({
      $or: [{ email: userData.email }, { phone: userData.phone }],
    })

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Check if admin
    const isAdmin = userData.email === process.env.ADMIN_EMAIL

    if (existingUser && !existingUser.isVerified) {
      // Update existing unverified user
      existingUser.name = userData.name
      existingUser.phone = userData.phone
      existingUser.password = hashedPassword
      existingUser.address = userData.address
      existingUser.isVerified = true
      existingUser.isAdmin = isAdmin
      await existingUser.save()

      existingUser = existingUser.toObject()
    } else if (existingUser && existingUser.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists with this email or phone",
        },
        { status: 400 },
      )
    } else {
      // Create new user
      existingUser = await User.create({
        ...userData,
        password: hashedPassword,
        isVerified: true,
        isAdmin: isAdmin,
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        role: "user",
        isAdmin: isAdmin,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" },
    )

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: "user",
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
    console.error("User signup error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
