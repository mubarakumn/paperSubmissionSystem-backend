import express from "express";
import { submitPaper, getMyPapers, getAllPapers, updatePaperStatus } from "../controllers/paperController.js";
import { authMiddleware, roleCheck } from "../middleware/authMiddleware.js";

const router = express.Router();

// Author submits
router.post("/", authMiddleware, roleCheck("Author"), submitPaper);

// Author checks their submissions
router.get("/mine", authMiddleware, roleCheck("Author"), getMyPapers);

// Editors/Admin view all submissions
router.get("/", authMiddleware, roleCheck("Editor", "Admin"), getAllPapers);

// Editor/Admin updates paper status
router.patch("/:id/status", authMiddleware, roleCheck("Editor", "Admin"), updatePaperStatus);

export default router;
