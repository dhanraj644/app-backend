import mongoose from "mongoose";


const dbConeection = async (params) => {
    
    try {

        await mongoose.connect();
        console.log("datatbase is conected successfully");
        
    } catch (error) {

        console.error("ERROR:database is not conected",error);
        process.exit(1);
    }
}


export default dbConeection;