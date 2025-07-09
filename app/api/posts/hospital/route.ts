import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    console.log("📦 Fetching all hospital posts")

    const posts = await post
      .find({ authorType: "Hospital" })
      .populate("authorId", "name")
      .populate("mentionedId", "name")
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, posts })
  } catch (error) {
    console.error("💥 Error fetching hospital posts:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
