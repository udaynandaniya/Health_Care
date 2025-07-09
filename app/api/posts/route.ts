import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    console.log("📦 Fetching all posts (doctors and hospitals)")

    const posts = await post
      .find({ isApproved: true })
      .populate("authorId", "name")
      .populate("mentionedId", "name")
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    })
  } catch (error) {
    console.error("💥 Error fetching posts:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
