import { json, Router } from "express";
const router = Router();
import { authenticateToken } from "./userAuth.js";
import { authorizeAdmin } from "./userAuth.js";
import User from "../model/userSchema.js";
import Book from "../model/bookSchema.js"
import Order from "../model/orderSchema.js"

//todo place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            })

            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            })
        }
        return res.json({
            status: "success",
            messages: "Order Placed Successfully",
        })

    } catch (error) {
        res.status(500).json({ messages: "Internal server error" })
    }
})

//todo order history of perticular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });
        const ordersData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: ordersData,
        })
    } catch (error) {
        res.status(500).json({ messages: "Internal server error" })
    }
})

//todo get all orders---admin
router.get("/get-all-orders", authorizeAdmin, authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({ path: "book", })//write books if wrong
            .populate({ path: "user", })
            .sort({ createdAt: -1 })

        return res.json({
            status: "Sucsess",
            data: userData,
        });

    } catch (error) {
        res.status(500).json({ messages: "Internal server error" })
    }
})

//todo update order-admin
router.put("/update-status/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status})
        return res.json({
            status:"Success",
            messages:"Status Updated Successfully",
        });
    } catch (error) {
        res.status(500).json({ messages: "Internal server error" })
    }
})

export default router;