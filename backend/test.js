const oracledb = require("oracledb");

async function test() {
  try {
    const connection = await oracledb.getConnection({
      user: "system",
      password: "abhinav84094",
      connectString: "localhost:1521/XEPDB1"
    });
    console.log("Connected to Oracle!");
    await connection.close();
  } catch (err) {
    console.error(err);
  }
}

test();
