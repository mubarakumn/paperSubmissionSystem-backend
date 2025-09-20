import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  volume: { type: Number, required: true },   // e.g., Volume 1
  number: { type: Number, required: true },   // e.g., Issue 2
  publicationDate: { type: Date, required: true },
  papers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paper' }]
}, { timestamps: true });

export default mongoose.model("Issue", IssueSchema);
