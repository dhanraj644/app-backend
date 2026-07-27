import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const dbConeection = async (params) => {
    
    try {

        await mongoose.connect(process.env.DB_URL);
        console.log("datatbase is conected successfully");
        
    } catch (error) {

        console.error("ERROR:database is not conected",error);
        process.exit(1);
    }
}


export default dbConeection;