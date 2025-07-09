import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    if (!decoded.isAdmin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 })
    }

    await dbConnect()

    const [users, doctors, hospitals] = await Promise.all([
      User.find().select("-password").sort({ createdAt: -1 }),
      Doctor.find().select("-password").sort({ createdAt: -1 }),
      Hospital.find().select("-password").sort({ createdAt: -1 }),
    ])

    // Combine all users with role information
    const allUsers = [
      ...users.map((user) => ({ ...user.toObject(), role: "user" })),
      ...doctors.map((doctor) => ({ ...doctor.toObject(), role: "doctor" })),
      ...hospitals.map((hospital) => ({ ...hospital.toObject(), role: "hospital" })),
    ]

    return NextResponse.json({ success: true, data: allUsers })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
