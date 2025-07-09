// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import EmergencyAlert from "@/lib/models/EmergencyAlert"
// import Hospital from "@/lib/models/Hospital"

// export async function POST(request: NextRequest) {
//   try {
//     const token = request.cookies.get("auth-token")?.value
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
//     const { alertId, action } = await request.json() // action: 'accept' or 'deny'

//     console.log("🏥 Hospital responding to alert:", { alertId, action, hospitalId: decoded.userId })

//     if (!alertId || !action || !["accept", "deny"].includes(action)) {
//       return NextResponse.json({ success: false, message: "Invalid request data" }, { status: 400 })
//     }

//     await dbConnect()

//     // Get hospital details
//     const hospital = await Hospital.findById(decoded.userId)
//     if (!hospital) {
//       return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
//     }

//     // Find the emergency alert
//     const alert = await EmergencyAlert.findById(alertId).populate("userId", "name email phone")

//     if (!alert) {
//       return NextResponse.json({ success: false, message: "Emergency alert not found" }, { status: 404 })
//     }

//     if (alert.status !== "pending") {
//       return NextResponse.json({ success: false, message: "Alert is no longer pending" }, { status: 400 })
//     }

//     if (action === "accept") {
//       // Hospital accepts the emergency
//       const updatedAlert = await EmergencyAlert.findByIdAndUpdate(
//         alertId,
//         {
//           status: "accepted",
//           acceptedBy: decoded.userId,
//           respondedAt: new Date(),
//           isRead: true,
//         },
//         { new: true },
//       ).populate("acceptedBy", "name email phone")

//       console.log("✅ Emergency alert accepted by hospital:", {
//         alertId: updatedAlert._id,
//         hospitalName: hospital.name,
//         patientName: alert.userInfo?.name || alert.userId?.name,
//       })

//       return NextResponse.json({
//         success: true,
//         message: "Emergency alert accepted successfully",
//         alert: updatedAlert,
//         action: "accepted",
//       })
//     } else if (action === "deny") {
//       // Hospital denies the emergency - just mark as read for this hospital
//       // Don't change the status, let other hospitals see it
//       await EmergencyAlert.findByIdAndUpdate(alertId, {
//         $addToSet: { deniedBy: decoded.userId }, // Add hospital to denied list
//       })

//       console.log("❌ Emergency alert denied by hospital:", {
//         alertId,
//         hospitalName: hospital.name,
//         patientName: alert.userInfo?.name || alert.userId?.name,
//       })

//       return NextResponse.json({
//         success: true,
//         message: "Emergency alert denied",
//         action: "denied",
//       })
//     }
//   } catch (error) {
//     console.error("💥 Error responding to emergency alert:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }


import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/utils/db"
import Hospital from "@/models/hospital"
import EmergencyAlert from "@/models/emergencyAlert"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { alertId, hospitalId, action } = await req.json()

    if (!alertId || !hospitalId || !action) {
      return NextResponse.json({ message: "Missing required parameters" }, { status: 400 })
    }

    const hospital = await Hospital.findById(hospitalId)

    if (!hospital) {
      return NextResponse.json({ message: "Hospital not found" }, { status: 404 })
    }

    if (action !== "accept" && action !== "deny") {
      return NextResponse.json({ message: "Invalid action. Must be 'accept' or 'deny'" }, { status: 400 })
    }

    if (action === "accept") {
      // Accept the alert and set isRead = true
      await EmergencyAlert.findByIdAndUpdate(alertId, {
        status: "accepted",
        acceptedBy: {
          _id: hospital._id,
          name: hospital.name,
          phone: hospital.phone,
        },
        isRead: true, // Set to true when accepted
        updatedAt: new Date(),
      })
    } else if (action === "deny") {
      // Decline the alert but keep isRead = false
      await EmergencyAlert.findByIdAndUpdate(alertId, {
        status: "declined",
        isRead: false, // Keep as false when declined
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({ message: `Alert ${action}ed successfully` }, { status: 200 })
  } catch (error: any) {
    console.error("Error responding to emergency alert:", error)
    return NextResponse.json({ message: "Failed to respond to emergency alert", error: error.message }, { status: 500 })
  }
}

