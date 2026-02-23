import { Router } from "express";
import User from "../model/userSchema.js";
import { authenticateToken } from "./userAuth.js"
const router = Router();

//todo add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid,id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);

        if (isBookInCart) {
            return res.json({
                status:"Success",
                messages:"Book is already in cart"
            });
        }
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } })
        return res.json({
            status:"Success",
            messages:"Book added to cart"
        });
    } catch (error) {
        res.status(500).json({messages:"Internal server error"})
    }
});

//todo remove from cart
router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try {
        const {bookid}=req.params;
        const {id}=req.headers;

        await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid}
        })
        return res.json({
            status:"success",
            message:"Book removed from cart"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
        
    }
})

//todo get cart  of a perticular user
router.get("/get-cart-book",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const userData=await User.findById(id).populate("cart");
        const cart=userData.cart.reverse();
        return res.json({status:"Success",data:cart})
        
    } catch (error) {
        res.status(500).json({messages:"Internal server error"})
    }
})


export default router;
