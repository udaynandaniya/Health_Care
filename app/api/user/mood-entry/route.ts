import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import MoodEntry from "@/lib/models/MoodEntry"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { mood, energy, anxiety, sleep, notes } = await request.json()

    await dbConnect()

    // Check if entry already exists for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const existingEntry = await MoodEntry.findOne({
      userId: decoded.userId,
      createdAt: { $gte: today, $lt: tomorrow },
    })

    if (existingEntry) {
      // Update existing entry
      existingEntry.mood = mood
      existingEntry.energy = energy
      existingEntry.anxiety = anxiety
      existingEntry.sleep = sleep
      existingEntry.notes = notes
      await existingEntry.save()
    } else {
      // Create new entry
      await MoodEntry.create({
        userId: decoded.userId,
        mood,
        energy,
        anxiety,
        sleep,
        notes,
      })
    }

    return NextResponse.json({ success: true, message: "Mood entry saved" })
  } catch (error) {
    console.error("Error saving mood entry:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
