const { getConnection } = require("../config/db");

/* ADD CONTENT */
exports.createPost = async (req, res) => {
  const { body, imageUrl, user_id } = req.body;
  const conn = await getConnection();

  await conn.execute(
    `INSERT INTO posts (body, image_url, user_id)
     VALUES (:body, :imageUrl, :user_id)`,
    [body, imageUrl, user_id],
    { autoCommit: true }
  );

  res.json({ message: "Content added" });
};

/* GET ALL CONTENT */
exports.getPosts = async (req, res) => {
  const conn = await getConnection();

  const result = await conn.execute(`
    SELECT p.id,
           p.body,
           p.image_url,
           u.name,
           p.created_at
    FROM posts p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `);

  res.json(result.rows);
};
