import mongoose from "mongoose";

const PaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  keywords: [String],
  fileUrl: { type: String, required: true }, // Cloud storage link

  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  editor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  status: { 
    type: String, 
    enum: ['Submitted', 'Under Review', 'Accepted', 'Rejected', 'Published'], 
    default: 'Submitted' 
  },

  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['Author', 'Reviewer', 'Editor', 'Admin'] },
      text: String,
      date: { type: Date, default: Date.now }
    }
  ],

  issue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' } // once published

}, { timestamps: true });

export default mongoose.model("Paper", PaperSchema);
