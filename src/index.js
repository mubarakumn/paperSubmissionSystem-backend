import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.js";
import paperRoutes from "./routes/papers.js";
import reviewRoutes from "./routes/reviews.js";
import issueRoutes from "./routes/issues.js";
import notificationRoutes from "./routes/notifications.js";

import User from "./models/UserModel.js";
import bcrypt from "bcryptjs";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/papers", paperRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/notifications", notificationRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Academic Journal Management API is running...");
});

// Create test users 
app.post("/api/testuser", async (req, res) => {
  try {
    const users = [
      { name: "Alice Author", email: "author@test.com", password: "123456", role: "Author" },
      { name: "Randy Reviewer", email: "reviewer@test.com", password: "123456", role: "Reviewer" },
      { name: "Eddie Editor", email: "editor@test.com", password: "123456", role: "Editor" },
      { name: "Andy Admin", email: "admin@test.com", password: "123456", role: "Admin" },
    ];

    for (let user of users) {
      const exists = await User.findOne({ email: user.email });
      if (!exists) {
        const hashed = await bcrypt.hash(user.password, 10);
        await User.create({ ...user, password: hashed });
      }
    }

    res.json({ message: "✅ Test users created", users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Connect DB & start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB connection error:", err));
