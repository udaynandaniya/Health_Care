import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import MoodEntry from "@/lib/models/MoodEntry"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    await dbConnect()

    // Get last 30 days of mood data
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const moodEntries = await MoodEntry.find({
      userId: decoded.userId,
      createdAt: { $gte: thirtyDaysAgo },
    }).sort({ createdAt: -1 })

    // Get today's mood entry
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayMood = await MoodEntry.findOne({
      userId: decoded.userId,
      createdAt: { $gte: today, $lt: tomorrow },
    })

    return NextResponse.json({
      success: true,
      data: moodEntries,
      today: todayMood,
    })
  } catch (error) {
    console.error("Error fetching mood data:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
