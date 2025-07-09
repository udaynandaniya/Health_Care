import { type NextRequest, NextResponse } from "next/server"
import EmergencyAlert from "@/lib/models/EmergencyAlert"
import { verifyToken } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    // const decoded = verifyToken(token)
    // if (!decoded || decoded.role !== "user") {
    //   return NextResponse.json({ message: "User access required" }, { status: 403 })
    // }

    const { alertId } = await request.json()

    if (!alertId) {
      return NextResponse.json({ message: "Alert ID is required" }, { status: 400 })
    }

    // Find the alert and verify it belongs to the user
    const alert = await EmergencyAlert.findById(alertId)
    if (!alert) {
      return NextResponse.json({ message: "Alert not found" }, { status: 404 })
    }

    // Check if the alert belongs to the current user
    // if (alert.userId.toString() !== decoded.id) {
    //   return NextResponse.json({ message: "Unauthorized to delete this alert" }, { status: 403 })
    // }

    // Delete the alert
    await EmergencyAlert.findByIdAndDelete(alertId)

    return NextResponse.json({
      success: true,
      message: "Emergency alert deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting emergency alert:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
