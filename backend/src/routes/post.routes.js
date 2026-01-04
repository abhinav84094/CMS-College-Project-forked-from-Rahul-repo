const router = require("express").Router();
const {
  createPost,
  getPosts,
} = require("../controllers/post.controller");

// Create a new post
// POST /api/posts
router.post("/", createPost);

// Get all posts
// GET /api/posts
router.get("/", getPosts);

module.exports = router;
