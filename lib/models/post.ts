import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "authorType" },
  authorType: { type: String, required: true, enum: ["Doctor", "Hospital"] },
  mentionedId: { type: mongoose.Schema.Types.ObjectId, refPath: "mentionedType" },
  mentionedType: { type: String, enum: ["Doctor", "Hospital"] },
  category: { type: String, required: true },
  tags: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Post || mongoose.model("Post", postSchema)
