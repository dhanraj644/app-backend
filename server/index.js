import dbConeection from "./src/config/db.js";
import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();


const PORT= process.env.PORT||5000;
const serverStart = async () => {
    
    try {
        
        await dbConeection();

        app.listen(PORT,()=>{

            console.log(`server is runing port number ${PORT}`);
        })
        
    } catch (error) {
        
        console.error("Server startup failed:", error);
        process.exit(1)
    }
}

serverStart();