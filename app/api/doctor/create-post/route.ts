import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"

export async function POST(request: NextRequest) {
  try {
    console.log("📥 Incoming request to create doctor post")

    const token = request.cookies.get("auth-token")?.value
    console.log("🔐 Extracted token:", token ? "✅ Present" : "❌ Missing")

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    console.log("👨‍⚕️ Decoded JWT:", decoded)

    if (decoded.role !== "doctor") {
      return NextResponse.json({ success: false, message: "Doctor access required" }, { status: 403 })
    }

    const { title, content, category, tags } = await request.json()
    console.log("📝 Post data received:", { title, content, category, tags })

    await dbConnect()
    console.log("✅ Connected to MongoDB")

    const newPost = await post.create({
      title,
      content,
      category,
      tags,
      authorId: decoded.userId,
      authorType: "Doctor",
      mentionedId: null,
      mentionedType: null,
      isApproved: true, // ✅ You said no admin approval required
    })

    console.log("✅ Doctor post created:", newPost._id)

    return NextResponse.json({ success: true, data: newPost })
  } catch (error) {
    console.error("💥 Error creating doctor post:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
