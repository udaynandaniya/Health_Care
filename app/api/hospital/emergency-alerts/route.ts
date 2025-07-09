// //C:\Users\UDAYN\Downloads\healthcare-platform\app\api\hospital\emergency-alerts\route.ts
// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import EmergencyAlert from "@/lib/models/EmergencyAlert"
// import Hospital from "@/lib/models/Hospital"

// // Helper function to calculate distance between two coordinates
// function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
//   const R = 6371 // Radius of the Earth in kilometers
//   const dLat = (lat2 - lat1) * (Math.PI / 180)
//   const dLng = (lng2 - lng1) * (Math.PI / 180)
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
//   const distance = R * c // Distance in kilometers
//   return distance
// }

// export async function GET(request: NextRequest) {
//   try {
//     const token = request.cookies.get("auth-token")?.value
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
//     await dbConnect()

//     console.log("🏥 Hospital checking for emergency alerts:", decoded.userId)

//     // Get hospital details
//     const hospital = await Hospital.findById(decoded.userId)
//     if (!hospital) {
//       return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
//     }

//     console.log("🏥 Hospital found:", {
//       name: hospital.name,
//       isAvailable: hospital.isAvailable,
//       isHandleEmergency: hospital.isHandleEmergency,
//       location: hospital.address,
//     })

//     // Check if hospital is available and handles emergencies
//     if (!hospital.isAvailable || !hospital.isHandleEmergency) {
//       console.log("❌ Hospital not available or doesn't handle emergencies")
//       return NextResponse.json({
//         success: true,
//         alerts: [],
//         message: "Hospital not available for emergency services",
//       })
//     }

//     // Find pending emergency alerts that are not read and not accepted by any hospital
//     const pendingAlerts = await EmergencyAlert.find({
//       status: "pending",
//       isRead: false,
//       acceptedBy: { $exists: false },
//     })
//       .populate("userId", "name email phone address")
//       .sort({ createdAt: -1 })
//       .limit(10)

//     console.log(`🔍 Found ${pendingAlerts.length} pending alerts`)

//     // Filter alerts by distance (within 50km radius)
//     const nearbyAlerts = []
//     const MAX_DISTANCE_KM = 50

//     for (const alert of pendingAlerts) {
//       let alertLat, alertLng

//       // Get alert location coordinates
//       if (alert.location?.lat && alert.location?.lng) {
//         alertLat = alert.location.lat
//         alertLng = alert.location.lng
//       } else if (alert.location?.address?.geoLocation?.lat && alert.location?.address?.geoLocation?.lng) {
//         alertLat = alert.location.address.geoLocation.lat
//         alertLng = alert.location.address.geoLocation.lng
//       } else {
//         console.log("⚠️ Alert has no location data:", alert._id)
//         continue
//       }

//       // Get hospital location coordinates (assuming hospital has geoLocation in address)
//       let hospitalLat, hospitalLng
//       if (hospital.address?.geoLocation?.lat && hospital.address?.geoLocation?.lng) {
//         hospitalLat = hospital.address.geoLocation.lat
//         hospitalLng = hospital.address.geoLocation.lng
//       } else {
//         console.log("⚠️ Hospital has no location data")
//         continue
//       }

//       // Calculate distance
//       const distance = calculateDistance(alertLat, alertLng, hospitalLat, hospitalLng)
//       console.log(`📏 Distance to alert ${alert._id}: ${distance.toFixed(2)}km`)

//       if (distance <= MAX_DISTANCE_KM) {
//         nearbyAlerts.push({
//           ...alert.toObject(),
//           distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
//         })
//       }
//     }

//     console.log(`✅ Found ${nearbyAlerts.length} nearby alerts within ${MAX_DISTANCE_KM}km`)

//     return NextResponse.json({
//       success: true,
//       alerts: nearbyAlerts,
//       hospitalInfo: {
//         name: hospital.name,
//         maxDistance: MAX_DISTANCE_KM,
//       },
//     })
//   } catch (error) {
//     console.error("💥 Error fetching emergency alerts for hospital:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import EmergencyAlert from "@/lib/models/EmergencyAlert"
import Hospital from "@/lib/models/Hospital"

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in kilometers
  return distance
}

// Helper function to check if locations are nearby based on address
function isNearbyByAddress(
  hospitalAddress: any,
  alertAddress: any,
): { isNearby: boolean; distance: number; reason: string } {
  console.log("🔍 Checking address-based proximity:")
  console.log("🏥 Hospital Address:", {
    area: hospitalAddress?.area,
    townOrVillage: hospitalAddress?.townOrVillage,
    taluka: hospitalAddress?.taluka,
    district: hospitalAddress?.district,
    pincode: hospitalAddress?.pincode,
  })
  console.log("🚨 Alert Address:", {
    area: alertAddress?.area,
    townOrVillage: alertAddress?.townOrVillage,
    taluka: alertAddress?.taluka,
    district: alertAddress?.district,
    pincode: alertAddress?.pincode,
  })

  // Same pincode = very close (within 5km)
  if (hospitalAddress?.pincode && alertAddress?.pincode && hospitalAddress.pincode === alertAddress.pincode) {
    console.log("✅ Same pincode found - Very close proximity")
    return { isNearby: true, distance: 5, reason: "Same pincode" }
  }

  // Same taluka = nearby (within 15km)
  if (
    hospitalAddress?.taluka &&
    alertAddress?.taluka &&
    hospitalAddress.taluka.toLowerCase() === alertAddress.taluka.toLowerCase()
  ) {
    console.log("✅ Same taluka found - Close proximity")
    return { isNearby: true, distance: 15, reason: "Same taluka" }
  }

  // Same district = moderate distance (within 30km)
  if (
    hospitalAddress?.district &&
    alertAddress?.district &&
    hospitalAddress.district.toLowerCase() === alertAddress.district.toLowerCase()
  ) {
    console.log("✅ Same district found - Moderate proximity")
    return { isNearby: true, distance: 30, reason: "Same district" }
  }

  // Same area name = very close (within 3km)
  if (
    hospitalAddress?.area &&
    alertAddress?.area &&
    hospitalAddress.area.toLowerCase() === alertAddress.area.toLowerCase()
  ) {
    console.log("✅ Same area found - Very close proximity")
    return { isNearby: true, distance: 3, reason: "Same area" }
  }

  // Same town/village = close (within 10km)
  if (
    hospitalAddress?.townOrVillage &&
    alertAddress?.townOrVillage &&
    hospitalAddress.townOrVillage.toLowerCase() === alertAddress.townOrVillage.toLowerCase()
  ) {
    console.log("✅ Same town/village found - Close proximity")
    return { isNearby: true, distance: 10, reason: "Same town/village" }
  }

  console.log("❌ No address match found - Too far")
  return { isNearby: false, distance: 999, reason: "No address match" }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    await dbConnect()

    console.log("🏥 Hospital checking for emergency alerts:", decoded.userId)

    // Get hospital details
    const hospital = await Hospital.findById(decoded.userId)
    if (!hospital) {
      return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
    }

    console.log("🏥 Hospital found:", {
      name: hospital.name,
      isAvailable: hospital.isAvailable,
      isHandleEmergency: hospital.isHandleEmergency,
      address: hospital.address,
    })

    // Check if hospital is available and handles emergencies
    if (!hospital.isAvailable || !hospital.isHandleEmergency) {
      console.log("❌ Hospital not available or doesn't handle emergencies")
      return NextResponse.json({
        success: true,
        alerts: [],
        message: "Hospital not available for emergency services",
      })
    }

    // Find pending emergency alerts that are not read and not accepted by any hospital
    const pendingAlerts = await EmergencyAlert.find({
      status: "pending",
      isRead: false,
      acceptedBy: { $exists: false },
    })
      .populate("userId", "name email phone address")
      .sort({ createdAt: -1 })
      .limit(10)

    console.log(`🔍 Found ${pendingAlerts.length} pending alerts`)

    // Filter alerts by distance (within 50km radius)
    const nearbyAlerts = []
    const MAX_DISTANCE_KM = 50

    for (const alert of pendingAlerts) {
      console.log(`\n📋 Processing alert ${alert._id}:`)
      console.log("Alert data:", {
        userInfo: alert.userInfo,
        location: alert.location,
        message: alert.message,
        priority: alert.priority,
      })

      let alertLat, alertLng, hospitalLat, hospitalLng
      let distance = 999 // Default high distance
      let proximityMethod = "unknown"

      // Method 1: Try GPS coordinates first
      console.log("🛰️ Checking GPS coordinates...")

      // Get alert location coordinates
      if (alert.location?.lat && alert.location?.lng) {
        alertLat = alert.location.lat
        alertLng = alert.location.lng
        console.log(`📍 Alert GPS: ${alertLat}, ${alertLng}`)
      } else if (alert.location?.address?.geoLocation?.lat && alert.location?.address?.geoLocation?.lng) {
        alertLat = alert.location.address.geoLocation.lat
        alertLng = alert.location.address.geoLocation.lng
        console.log(`📍 Alert GPS (from address): ${alertLat}, ${alertLng}`)
      } else {
        console.log("⚠️ Alert has no GPS coordinates")
      }

      // Get hospital location coordinates
      if (hospital.address?.geoLocation?.lat && hospital.address?.geoLocation?.lng) {
        hospitalLat = hospital.address.geoLocation.lat
        hospitalLng = hospital.address.geoLocation.lng
        console.log(`�� Hospital GPS: ${hospitalLat}, ${hospitalLng}`)
      } else {
        console.log("⚠️ Hospital has no GPS coordinates")
      }

      // If both have GPS coordinates, calculate exact distance
      if (alertLat && alertLng && hospitalLat && hospitalLng) {
        distance = calculateDistance(alertLat, alertLng, hospitalLat, hospitalLng)
        proximityMethod = "GPS calculation"
        console.log(`📏 GPS Distance calculated: ${distance.toFixed(2)}km`)
      } else {
        // Method 2: Fallback to address-based proximity
        console.log("🏠 Falling back to address-based proximity...")
        const addressProximity = isNearbyByAddress(hospital.address, alert.location?.address)
        distance = addressProximity.distance
        proximityMethod = `Address matching (${addressProximity.reason})`

        if (addressProximity.isNearby) {
          console.log(`✅ Address-based proximity: ${distance}km (${addressProximity.reason})`)
        } else {
          console.log(`❌ Not nearby by address matching`)
        }
      }

      console.log(`📊 Final distance: ${distance}km using ${proximityMethod}`)

      // Check if within acceptable range
      if (distance <= MAX_DISTANCE_KM) {
        console.log(`✅ Alert ${alert._id} is within ${MAX_DISTANCE_KM}km range - ADDING TO LIST`)
        nearbyAlerts.push({
          ...alert.toObject(),
          distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
          proximityMethod: proximityMethod,
        })
      } else {
        console.log(`❌ Alert ${alert._id} is ${distance}km away - TOO FAR (max: ${MAX_DISTANCE_KM}km)`)
      }
    }

    console.log(`\n🎯 FINAL RESULT: Found ${nearbyAlerts.length} nearby alerts within ${MAX_DISTANCE_KM}km`)

    if (nearbyAlerts.length > 0) {
      console.log("📋 Nearby alerts summary:")
      nearbyAlerts.forEach((alert, index) => {
        console.log(`${index + 1}. Alert ${alert._id}: ${alert.distance}km away (${alert.proximityMethod})`)
      })
    }

    return NextResponse.json({
      success: true,
      alerts: nearbyAlerts,
      hospitalInfo: {
        name: hospital.name,
        maxDistance: MAX_DISTANCE_KM,
        location: hospital.address,
      },
    })
  } catch (error) {
    console.error("💥 Error fetching emergency alerts for hospital:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
