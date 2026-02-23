import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

export const conn=async()=>{
    try {
        await mongoose.connect(`${process.env.URL}`)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error); 
    }
}

conn();