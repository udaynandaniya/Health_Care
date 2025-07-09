import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"

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

    const { providerId, providerType, verify } = await request.json()
    await dbConnect()

    let Model
    switch (providerType) {
      case "doctor":
        Model = Doctor
        break
      case "hospital":
        Model = Hospital
        break
      default:
        return NextResponse.json({ success: false, message: "Invalid provider type" }, { status: 400 })
    }

    await Model.findByIdAndUpdate(providerId, { isVerified: verify })

    return NextResponse.json({
      success: true,
      message: `${providerType} ${verify ? "verified" : "unverified"} successfully`,
    })
  } catch (error) {
    console.error("Error updating provider verification:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
