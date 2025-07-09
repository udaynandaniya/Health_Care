// //C:\Users\UDAYN\Downloads\healthcare-platform\lib\models\Hospital.ts

// import mongoose from "mongoose"

// const addressSchema = new mongoose.Schema({
//   street: { type: String, required: true },
//   area: { type: String, required: true },
//   townOrVillage: { type: String, required: true },
//   taluka: { type: String, required: true },
//   district: { type: String, required: true },
//   pincode: { type: String, required: true },
//   geoLocation: {
//     lat: { type: Number },
//     lng: { type: Number },
//   },
// })

// const hospitalSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   isAvailable: { type: Boolean, default: true },
//   isHandleEmergency: { type: Boolean, required: true },
//   isVerified: { type: Boolean, default: false },
//   address: { type: addressSchema, required: true },
//   location: {
//     lat: { type: Number },
//     lng: { type: Number },
//   },
//   role: { type: String, default: "hospital" },
//   createdAt: { type: Date, default: Date.now },
// })

// export default mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema)


import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  area: { type: String, required: true },
  townOrVillage: { type: String, required: true },
  taluka: { type: String, required: true },
  district: { type: String, required: true },
  pincode: { type: String, required: true },
  geoLocation: {
    lat: { type: Number, required: true }, // Make coordinates required for distance calculation
    lng: { type: Number, required: true },
  },
})

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: addressSchema, required: true },
  specialties: [{ type: String, required: true }],
  isVerified: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true }, // Hospital availability status
  isHandleEmergency: { type: Boolean, required: true }, // Whether hospital handles emergencies - REQUIRED
  role: { type: String, default: "hospital" },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema)
