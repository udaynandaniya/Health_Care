import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import Hospital from "@/lib/models/Hospital"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    if (decoded.role !== "hospital") {
      return NextResponse.json({ success: false, message: "Hospital access required" }, { status: 403 })
    }

    await dbConnect()

    const hospital = await Hospital.findById(decoded.userId).select("-password")

    if (!hospital) {
      return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: hospital,
      isHandleEmergency: hospital.isHandleEmergency,
      isAvailable: hospital.isAvailable,
    })
  } catch (error) {
    console.error("Error fetching hospital data:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
