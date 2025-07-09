import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    if (decoded.role !== "hospital") {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 })
    }

    await dbConnect()
    const posts = await post
      .find({ authorId: decoded.userId, authorType: "Hospital" })
      .populate("mentionedId", "name")

    return NextResponse.json({ success: true, posts })
  } catch (error) {
    console.error("💥 Error fetching own posts:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
