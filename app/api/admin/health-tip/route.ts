import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import HealthTip from "@/lib/models/HealthTip"

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

    const tips = await HealthTip.find().populate("authorId", "name").sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: tips })
  } catch (error) {
    console.error("Error fetching health tips:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
