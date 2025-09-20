import Paper from "../models/PaperModel.js";
import Review from "../models/ReviewModel.js";

export const assignReviewer = async (req, res) => {
  try {
    const { paperId, reviewerId } = req.body;
    const paper = await Paper.findById(paperId);
    paper.reviewers.push(reviewerId);
    await paper.save();
    res.json({ message: "Reviewer assigned", paper });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAssignedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewer: req.user._id }).populate("paper");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const submitReview = async (req, res) => {
  try {
    const { comments, recommendation } = req.body;
    const review = await Review.create({
      paper: req.params.paperId,
      reviewer: req.user._id,
      comments,
      recommendation
    });
    res.status(201).json({ message: "Review submitted", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
