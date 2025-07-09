import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import Post from "@/lib/models/Post"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { postId } = await request.json()

    await dbConnect()

    const post = await Post.findById(postId)
    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
    }

    const userLikedIndex = post.likes.indexOf(decoded.userId)
    if (userLikedIndex > -1) {
      post.likes.splice(userLikedIndex, 1)
    } else {
      post.likes.push(decoded.userId)
    }

    await post.save()

    return NextResponse.json({ success: true, message: "Post like updated" })
  } catch (error) {
    console.error("Error updating post like:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
