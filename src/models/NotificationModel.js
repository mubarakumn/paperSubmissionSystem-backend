import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  link: String, // optional link to paper/submission page
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Notification", NotificationSchema);
