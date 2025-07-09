

// import mongoose from "mongoose"

// const emergencyAlertSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

//   // User info saved automatically
//   userInfo: {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//   },

//   location: {
//     lat: { type: Number },
//     lng: { type: Number },
//     address: {
//       street: String,
//       area: String,
//       townOrVillage: String,
//       taluka: String,
//       district: String,
//       pincode: String,
//       geoLocation: {
//         lat: { type: Number },
//         lng: { type: Number },
//       },
//     },
//   },

//   message: { type: String, default: "Emergency assistance needed" },
//   status: {
//     type: String,
//     enum: ["pending", "accepted", "completed", "cancelled"],
//     default: "pending",
//   },
//   acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
//   isRead: { type: Boolean, default: false },
//   priority: { type: String, enum: ["low", "medium", "high", "critical"], default: "high" },
//   createdAt: { type: Date, default: Date.now },
//   respondedAt: { type: Date },
// })

// export default mongoose.models.EmergencyAlert || mongoose.model("EmergencyAlert", emergencyAlertSchema)


import mongoose from "mongoose"

const emergencyAlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // User info saved automatically
  userInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },

  location: {
    lat: { type: Number },
    lng: { type: Number },
    address: {
      street: String,
      area: String,
      townOrVillage: String,
      taluka: String,
      district: String,
      pincode: String,
      geoLocation: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
  },

  message: { type: String, default: "Emergency assistance needed" },
  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending",
  },
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  deniedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }], // Track which hospitals denied
  isRead: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high", "critical"], default: "high" },
  createdAt: { type: Date, default: Date.now },
  respondedAt: { type: Date },
})

export default mongoose.models.EmergencyAlert || mongoose.model("EmergencyAlert", emergencyAlertSchema)
