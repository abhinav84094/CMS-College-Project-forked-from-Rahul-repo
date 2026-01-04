const { getConnection } = require("../config/db");
const oracledb = require("oracledb");

// FORCE Oracle to return CLOB as STRING
oracledb.fetchAsString = [ oracledb.CLOB ];

/**
 * CREATE POST
 * POST /api/posts
 */
exports.createPost = async (req, res) => {
  let conn;
  try {
    const { body, imageUrl, user_id } = req.body;

    if (!body || !user_id) {
      return res.status(400).json({
        message: "Post body and user_id are required",
      });
    }

    conn = await getConnection();

    await conn.execute(
      `INSERT INTO posts (body, image_url, user_id)
       VALUES (:body, :imageUrl, :user_id)`,
      {
        body,
        imageUrl: imageUrl || null,
        user_id,
      },
      { autoCommit: true }
    );

    res.status(201).json({ message: "Post created successfully" });

  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Failed to create post" });
  } finally {
    if (conn) await conn.close();
  }
};

/**
 * GET ALL POSTS
 * GET /api/posts
 */
exports.getPosts = async (req, res) => {
  let conn;
  try {
    conn = await getConnection();

    const result = await conn.execute(
      `SELECT 
          p.id,
          p.body,
          p.image_url,
          u.name AS author,
          TO_CHAR(p.created_at, 'DD-MON-YYYY HH24:MI') AS created_at
       FROM posts p
       JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC`,
      [],
      {
        outFormat: oracledb.OUT_FORMAT_ARRAY
      }
    );

    // SAFE JSON — no NVPair, no LOB, no circular refs
    const posts = result.rows.map(row => ({
      id: row[0],
      body: row[1],        // now STRING, not CLOB object
      image_url: row[2],
      author: row[3],
      created_at: row[4],
    }));

    res.status(200).json(posts);

  } catch (error) {
    console.error("Get Posts Error:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  } finally {
    if (conn) await conn.close();
  }
};


/**
 * DELETE POST
 * DELETE /api/posts/:id
 */
exports.deletePost = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Post id is required" });
    }

    conn = await getConnection();

    const result = await conn.execute(
      `DELETE FROM posts WHERE id = :id`,
      { id },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });

  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ message: "Failed to delete post" });
  } finally {
    if (conn) await conn.close();
  }
};
