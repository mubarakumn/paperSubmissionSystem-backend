import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  paper: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper', required: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  comments: { type: String, required: true },
  recommendation: { 
    type: String, 
    enum: ['Accept', 'Revise', 'Reject'], 
    required: true 
  }

}, { timestamps: { createdAt: "submittedAt", updatedAt: false } });

export default mongoose.model("Review", ReviewSchema);
