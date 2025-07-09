import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"

export async function GET(request: NextRequest) {
  try {
    console.log("📥 Doctor requesting own posts")

    const token = request.cookies.get("auth-token")?.value
    console.log("🔐 Token present:", !!token)

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    console.log("👨‍⚕️ Decoded doctor:", decoded)

    if (decoded.role !== "doctor") {
      return NextResponse.json({ success: false, message: "Doctor access required" }, { status: 403 })
    }

    await dbConnect()
    console.log("✅ Connected to MongoDB")

    const posts = await post
      .find({ authorId: decoded.userId, authorType: "Doctor" })
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, posts })
  } catch (error) {
    console.error("💥 Error fetching doctor posts:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
