// //C:\Users\UDAYN\Downloads\healthcare-platform\app\api\hospital\create-post\route.ts

// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import Post from "@/lib/models/Post"

// export async function POST(request: NextRequest) {
//   try {
//     const token = request.cookies.get("auth-token")?.value
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
//     if (decoded.role !== "doctor") {
//       return NextResponse.json({ success: false, message: "Doctor access required" }, { status: 403 })
//     }

//     const { title, content, category, tags, mentionedHospital } = await request.json()

//     await dbConnect()

//     const post = await Post.create({
//       title,
//       content,
//       category,
//       tags,
//       authorId: decoded.userId,
//       authorType: "Doctor",
//       mentionedId: mentionedHospital || null,
//       mentionedType: mentionedHospital ? "Hospital" : null,
//       isApproved: false,
//     })

//     return NextResponse.json({ success: true, data: post })
//   } catch (error) {
//     console.error("Error creating doctor post:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }


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

    if (decoded.role !== "hospital") {
      return NextResponse.json({ success: false, message: "Hospital access required" }, { status: 403 })
    }

    const { title, content, category, tags, mentionedDoctor } = await request.json()

    await dbConnect()

    const post = await Post.create({
      title,
      content,
      category,
      tags,
      authorId: decoded.userId,
      authorType: "Hospital",
      mentionedId: mentionedDoctor || null,
      mentionedType: mentionedDoctor ? "Doctor" : null,
      isApproved: false,
    })

    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error("Error creating hospital post:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
