import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  area: { type: String, required: true },
  townOrVillage: { type: String, required: true },
  taluka: { type: String, required: true },
  district: { type: String, required: true },
  pincode: { type: String, required: true },
  geoLocation: {
    lat: { type: Number },
    lng: { type: Number },
  },
})

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  isHandleEmergency: { type: Boolean, required: true },
  isVerified: { type: Boolean, default: false },
  address: { type: addressSchema, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  role: { type: String, default: "hospital" },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema)
