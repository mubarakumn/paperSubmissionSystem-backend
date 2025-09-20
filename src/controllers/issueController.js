import Issue from "../models/IssueModel.js";
import Paper from "../models/PaperModel.js";

export const createIssue = async (req, res) => {
  try {
    const { volume, number, publicationDate } = req.body;

    const issue = await Issue.create({
      volume,
      number,
      publicationDate,
      papers: []
    });

    res.status(201).json({ message: "Issue created successfully", issue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const publishPaper = async (req, res) => {
  try {
    const { issueId, paperId } = req.params;

    const paper = await Paper.findById(paperId);
    if (!paper) return res.status(404).json({ error: "Paper not found" });

    if (paper.status !== "Accepted") {
      return res.status(400).json({ error: "Only accepted papers can be published" });
    }

    const issue = await Issue.findById(issueId);
    if (!issue) return res.status(404).json({ error: "Issue not found" });

    issue.papers.push(paperId);
    await issue.save();

    paper.status = "Published";
    await paper.save();

    res.json({ message: "Paper published in issue", issue, paper });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("papers");
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
