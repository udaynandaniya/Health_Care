import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
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

    const { blockedId } = await request.json()
    await dbConnect()

    await BlockedList.findByIdAndDelete(blockedId)

    return NextResponse.json({ success: true, message: "User unblocked successfully" })
  } catch (error) {
    console.error("Error unblocking user:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
