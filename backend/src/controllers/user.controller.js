const { getConnection } = require("../config/db");

/* REGISTER USER */
exports.registerUser = async (req, res) => {
  const { name, password } = req.body;
  const conn = await getConnection();

  await conn.execute(
    `INSERT INTO users (name, password)
     VALUES (:name, :password)`,
    [name, password],
    { autoCommit: true }
  );

  res.json({ message: "User registered" });
};

/* LOGIN USER */
exports.loginUser = async (req, res) => {
  const { name, password } = req.body;
  const conn = await getConnection();

  const result = await conn.execute(
    `SELECT id, name FROM users
     WHERE name = :name AND password = :password`,
    [name, password]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: result.rows[0],
  });
};
