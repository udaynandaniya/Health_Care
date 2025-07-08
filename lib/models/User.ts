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

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: addressSchema, required: true },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || mongoose.model("User", userSchema)
