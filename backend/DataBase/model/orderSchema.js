
import mongoose from "mongoose";

const order = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    books: {
        type: mongoose.Types.ObjectId,
        ref: "books",
    },
    status: {
        type: String,
        default: "Order placed",
        enum: ["Order Placed"],
        enum: ["Order Placed", "Out of Delivery", "Delivered", "Cancled"],
    },
}, { timestamps: true }
);

export default mongoose.model("order", order);
