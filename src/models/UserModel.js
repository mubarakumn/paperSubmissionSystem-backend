import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Author', 'Reviewer', 'Editor', 'Admin'], 
    default: 'Author' 
  },
  isActive: { type: Boolean, default: true },
  bio: String,
  institution: String,
  profilePic: String
}, { timestamps: true });  // adds createdAt & updatedAt automatically

export default mongoose.model("User", UserSchema);
