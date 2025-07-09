import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import EmergencyAlert from "@/lib/models/EmergencyAlert"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { alertId } = await request.json()

    await dbConnect()

    const alert = await EmergencyAlert.findOneAndUpdate(
      { _id: alertId, userId: decoded.userId },
      { isRead: true },
      { new: true },
    )

    if (!alert) {
      return NextResponse.json({ success: false, message: "Alert not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Alert dismissed" })
  } catch (error) {
    console.error("Error dismissing alert:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
