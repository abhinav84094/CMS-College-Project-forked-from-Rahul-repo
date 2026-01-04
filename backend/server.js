require("dotenv").config();
const app = require("./src/app");
const { getConnection } = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const dbConnect = async ()=> {
    try{
        await getConnection();
    }
    catch(error){
        console.log("DB connecton failed", error.message);
    }
    finally{
        console.log("DB connected successfully")
    }
}

app.listen(PORT, () => {
    dbConnect()
  console.log(`Server running on port ${PORT}`);
});
