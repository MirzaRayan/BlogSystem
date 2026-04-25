import mongoose from "mongoose";

const DB_Connection = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`)
        console.log('DB connected Successfully!');
        
    } catch (error) {
        console.log('DB connection error',error);
        throw error
    }
}

export { DB_Connection }

