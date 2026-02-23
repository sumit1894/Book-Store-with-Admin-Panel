
import mongoose from "mongoose";

const book = new mongoose.Schema({
    url:{
        type:String,
        require:true,
    },
    
    title:{
        type:String,
        require:true,
    },
    author:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    desc:{
        type:String,
        require:true,
    },
    language:{
        type:String,
        require:true,
    },

}, { timestamps: true }
);

export default mongoose.model("books", book);
