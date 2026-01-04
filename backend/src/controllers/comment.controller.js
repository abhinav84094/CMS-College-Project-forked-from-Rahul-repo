const { getConnection } = require("../config/db");

// Add a comment
exports.addComment = async (req, res) => {
  const { comment_text, post_id, user_id } = req.body;
  const conn = await getConnection();

  await conn.execute(
    `INSERT INTO comments (comment_text, post_id, user_id)
     VALUES (:comment_text, :post_id, :user_id)`,
    [comment_text, post_id, user_id],
    { autoCommit: true }
  );

  res.json({ message: "Comment added" });
};

// Get comments for a post
exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  const conn = await getConnection();

  const result = await conn.execute(
    `SELECT c.id, c.comment_text, u.name AS author, c.created_at
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.post_id = :postId
     ORDER BY c.created_at ASC`,
    [postId]
  );

  res.json(result.rows);
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const conn = await getConnection();

  await conn.execute(
    `DELETE FROM comments WHERE id = :id`,
    [id],
    { autoCommit: true }
  );

  res.json({ message: "Comment deleted" });
};
