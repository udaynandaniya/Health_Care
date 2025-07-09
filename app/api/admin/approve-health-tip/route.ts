import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import HealthTip from "@/lib/models/HealthTip"

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

    const { tipId, approve } = await request.json()
    await dbConnect()

    if (approve) {
      await HealthTip.findByIdAndUpdate(tipId, {
        isApproved: true,
        isPublished: true,
        approvedAt: new Date(),
        approvedBy: decoded.userId,
      })
    } else {
      await HealthTip.findByIdAndDelete(tipId)
    }

    return NextResponse.json({
      success: true,
      message: `Health tip ${approve ? "approved" : "rejected"} successfully`,
    })
  } catch (error) {
    console.error("Error updating health tip:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
