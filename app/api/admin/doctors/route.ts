import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import Doctor from "@/lib/models/Doctor"

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

    const doctors = await Doctor.find().select("-password").populate("hospitalId", "name").sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: doctors })
  } catch (error) {
    console.error("Error fetching doctors:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
