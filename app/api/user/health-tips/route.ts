import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import HealthTip from "@/lib/models/HealthTip"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const tips = await HealthTip.find({
      isApproved: true,
      isPublished: true,
    })
      .populate("authorId", "name")
      .sort({ createdAt: -1 })
      .limit(20)

    return NextResponse.json({ success: true, data: tips })
  } catch (error) {
    console.error("Error fetching health tips:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
