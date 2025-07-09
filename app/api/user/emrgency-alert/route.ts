import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import EmergencyAlert from "@/lib/models/EmergencyAlert"
import User from "@/lib/models/User"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { location, message } = await request.json()

    await dbConnect()

    // Get user details for fallback address
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Create emergency alert
    const alert = await EmergencyAlert.create({
      userId: decoded.userId,
      location: location || { address: user.address },
      message: message || "Emergency assistance needed",
      priority: "high",
      status: "pending",
    })

    // TODO: Implement real-time notification to nearby hospitals
    // This would involve WebSocket connections or push notifications

    return NextResponse.json({
      success: true,
      message: "Emergency alert sent",
      alertId: alert._id,
    })
  } catch (error) {
    console.error("Error creating emergency alert:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
