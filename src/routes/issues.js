import express from "express";
import { createIssue, publishPaper, getIssues } from "../controllers/issueController.js";
import { authMiddleware, roleCheck } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, roleCheck("Admin"), createIssue);
router.patch("/:issueId/publish/:paperId", authMiddleware, roleCheck("Admin"), publishPaper);
router.get("/", getIssues);

export default router;
