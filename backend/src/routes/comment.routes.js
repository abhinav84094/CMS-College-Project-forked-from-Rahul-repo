const router = require("express").Router();
const {
  addComment,
  getCommentsByPost,
  deleteComment
} = require("../controllers/comment.controller");

// Add a new comment
router.post("/", addComment);

// Get all comments for a specific post
router.get("/:postId", getCommentsByPost);

// Delete a comment by ID (optional, for admin or owner)
router.delete("/:id", deleteComment);

module.exports = router;
