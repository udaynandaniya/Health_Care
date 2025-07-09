

// // import { type NextRequest, NextResponse } from "next/server"
// // import jwt from "jsonwebtoken"
// // import dbConnect from "@/lib/mongodb"
// // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // import User from "@/lib/models/User"

// // export async function POST(request: NextRequest) {
// //   try {
// //     const token = request.cookies.get("auth-token")?.value
// //     if (!token) {
// //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// //     const { location, message } = await request.json()


// //     await dbConnect()

// //     // Get user details for fallback address
// //     const user = await User.findById(decoded.userId)
// //     if (!user) {
// //       return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
// //     }

// //     // Prepare location data
// //     let locationData = {}

// //     if (location && location.lat && location.lng) {
// //       console.log("📍 Location provided:", location)

// //       locationData = {
// //         lat: location.lat,
// //         lng: location.lng,
// //         address: {
// //           street: "Current Location",
// //           area: "GPS Coordinates",
// //           townOrVillage: `${location.lat}, ${location.lng}`,
// //           taluka: "Unknown",
// //           district: "Unknown",
// //           pincode: "000000",
// //         },
// //       }
// //     } else {
// //       console.log("📍 No location provided, using user address")
// //       locationData = {
// //         address: {
// //           street: user.address || "Unknown",
// //           area: "User Registered Address",
// //           townOrVillage: "Unknown",
// //           taluka: "Unknown",
// //           district: "Unknown",
// //           pincode: "000000",
// //         },
// //       }
// //     }

// //     // Create emergency alert - just save to database
// //     const alert = await EmergencyAlert.create({
// //       userId: decoded.userId,
// //       location: locationData,
// //       message: message || "Emergency assistance needed - SOS Alert",
// //       priority: "critical",
// //       status: "pending",
// //     })

// //     console.log("✅ Emergency alert saved to database:", alert._id)

// //     // Emergency alert saved to database - hospitals can check for new alerts via polling

// //     return NextResponse.json({
// //       success: true,
// //       message: "Emergency alert saved successfully",
// //       alertId: alert._id,
// //       location: locationData,
// //     })
// //   } catch (error) {
// //     console.error("💥 Error saving emergency alert:", error)
// //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// //   }
// // }


// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import EmergencyAlert from "@/lib/models/EmergencyAlert"
// import User from "@/lib/models/User"

// export async function POST(request: NextRequest) {
//   try {
//     const token = request.cookies.get("auth-token")?.value
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
//     const { location, message } = await request.json()

//     console.log("🚨 Emergency Alert Request:", { userId: decoded.userId, location, message })

//     await dbConnect()

//     // Get user details - we need ALL user info
//     const user = await User.findById(decoded.userId)
//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
//     }

//     console.log("👤 User found:", { name: user.name, email: user.email, phone: user.phone })

//     // Prepare location data
//     let locationData = {}

//     if (location && location.lat && location.lng) {
//       console.log("📍 GPS Location provided:", location)

//       // Use GPS location + user's registered address
//       locationData = {
//         lat: location.lat,
//         lng: location.lng,
//         address: {
//           street: user.address.street,
//           area: user.address.area,
//           townOrVillage: user.address.townOrVillage,
//           taluka: user.address.taluka,
//           district: user.address.district,
//           pincode: user.address.pincode,
//           geoLocation: {
//             lat: location.lat,
//             lng: location.lng,
//           },
//         },
//       }
//     } else {
//       console.log("📍 No GPS, using user registered address")

//       // Use user's registered address only
//       locationData = {
//         lat: user.address.geoLocation?.lat || null,
//         lng: user.address.geoLocation?.lng || null,
//         address: {
//           street: user.address.street,
//           area: user.address.area,
//           townOrVillage: user.address.townOrVillage,
//           taluka: user.address.taluka,
//           district: user.address.district,
//           pincode: user.address.pincode,
//           geoLocation: {
//             lat: user.address.geoLocation?.lat || null,
//             lng: user.address.geoLocation?.lng || null,
//           },
//         },
//       }
//     }

//     // Create emergency alert with ALL user info
//     const alert = await EmergencyAlert.create({
//       userId: decoded.userId,

//       // Save user info automatically
//       userInfo: {
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//       },

//       location: locationData,
//       message: message || "🚨 EMERGENCY SOS - Immediate assistance needed!",
//       priority: "critical",
//       status: "pending",
//     })

//     console.log("✅ Emergency alert saved with user info:", {
//       alertId: alert._id,
//       userName: user.name,
//       userEmail: user.email,
//       userPhone: user.phone,
//       location: locationData,
//     })

//     return NextResponse.json({
//       success: true,
//       message: "Emergency alert saved successfully",
//       alertId: alert._id,
//       userInfo: {
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//       },
//       location: locationData,
//     })
//   } catch (error) {
//     console.error("💥 Error saving emergency alert:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }


import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import EmergencyAlert from "@/lib/models/EmergencyAlert"
import User from "@/lib/models/User"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { location, message } = await request.json()

    console.log("🚨 Emergency Alert Request:", { userId: decoded.userId, location, message })

    await dbConnect()

    // Get complete user details - we need ALL user info
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    console.log("👤 User found:", {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    })

    // Prepare location data
    let locationData = {}

    if (location && location.lat && location.lng) {
      console.log("📍 GPS Location provided:", location)

      // Use GPS location + user's registered address
      locationData = {
        lat: location.lat,
        lng: location.lng,
        address: {
          street: user.address.street,
          area: user.address.area,
          townOrVillage: user.address.townOrVillage,
          taluka: user.address.taluka,
          district: user.address.district,
          pincode: user.address.pincode,
          geoLocation: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      }
    } else {
      console.log("📍 No GPS, using user registered address")

      // Use user's registered address only
      locationData = {
        lat: user.address.geoLocation?.lat || null,
        lng: user.address.geoLocation?.lng || null,
        address: {
          street: user.address.street,
          area: user.address.area,
          townOrVillage: user.address.townOrVillage,
          taluka: user.address.taluka,
          district: user.address.district,
          pincode: user.address.pincode,
          geoLocation: {
            lat: user.address.geoLocation?.lat || null,
            lng: user.address.geoLocation?.lng || null,
          },
        },
      }
    }

    // Create emergency alert with ALL user info
    const alert = await EmergencyAlert.create({
      userId: decoded.userId,

      // Save user info automatically (this fixes the userInfo error)
      userInfo: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },

      location: locationData,
      message: message || "🚨 EMERGENCY SOS - Immediate assistance needed!",
      priority: "critical",
      status: "pending",
    })

    console.log("✅ Emergency alert saved with user info:", {
      alertId: alert._id,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      location: locationData,
    })

    return NextResponse.json({
      success: true,
      message: "Emergency alert saved successfully",
      alertId: alert._id,
      userInfo: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      location: locationData,
    })
  } catch (error) {
    console.error("💥 Error saving emergency alert:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
