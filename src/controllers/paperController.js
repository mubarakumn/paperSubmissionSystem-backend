import Paper from "../models/PaperModel.js";

export const submitPaper = async (req, res) => {
  try {
    const { title, abstract, keywords, fileUrl } = req.body;
    const paper = await Paper.create({
      title,
      abstract,
      keywords,
      fileUrl,
      author: req.user._id
    });
    res.status(201).json({ message: "Paper submitted", paper });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyPapers = async (req, res) => {
  try {
    const papers = await Paper.find({ author: req.user._id });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPapers = async (req, res) => {
  try {
    const papers = await Paper.find().populate("author", "name email");
    res.json(papers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePaperStatus = async (req, res) => {
  try {
    const { status } = req.body; // e.g., Under Review, Accepted, Rejected
    const paper = await Paper.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Paper status updated", paper });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
