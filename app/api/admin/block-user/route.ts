import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"
import BlockedList from "@/lib/models/BlockedList"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    if (!decoded.isAdmin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 })
    }

    const { userId, email, phone, role, reason } = await request.json()
    await dbConnect()

    // Add to blocked list
    await BlockedList.create({
      email,
      phone,
      reason,
      role,
    })

    // Delete user from appropriate collection
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
        return NextResponse.json({ success: false, message: "Invalid role" }, { status: 400 })
    }

    await Model.findByIdAndDelete(userId)

    return NextResponse.json({ success: true, message: "User blocked successfully" })
  } catch (error) {
    console.error("Error blocking user:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
