import express from "express";
import { assignReviewer, submitReview, getAssignedReviews } from "../controllers/reviewController.js";
import { authMiddleware, roleCheck } from "../middleware/authMiddleware.js";

const router = express.Router();

// Editor assigns reviewer
router.post("/assign", authMiddleware, roleCheck("Editor", "Admin"), assignReviewer);

// Reviewer sees assigned papers
router.get("/mine", authMiddleware, roleCheck("Reviewer"), getAssignedReviews);

// Reviewer submits review
router.post("/:paperId", authMiddleware, roleCheck("Reviewer"), submitReview);

export default router;
