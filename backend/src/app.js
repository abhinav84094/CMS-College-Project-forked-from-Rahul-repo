const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route (health check)
app.get("/", (req, res) => {
  res.status(200).json({ message: "CMS Backend API is running" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
