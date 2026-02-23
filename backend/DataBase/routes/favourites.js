import { Router } from "express";
import User from "../model/userSchema.js";
import { authenticateToken } from "./userAuth.js"
const router = Router();

//todo add book to favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid,id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourites = userData.favourites.includes(bookid);

        if (isBookFavourites) {
            return res.status(200).json({ messages: "Book is already in favourites" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } })
        return res.status(200).json({ messages: "Book added to favourites" });
    } catch (error) {
        res.status(500).json({messages:"Internal server error"})
    }
});

//todo remove book to favourites
router.put("/remove-book-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid,id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourites = userData.favourites.includes(bookid);

        if (isBookFavourites) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } })
            return res.status(200).json({ messages: "Book removed from favourites" });
        }
    } catch (error) {
        res.status(500).json({messages:"Internal server error"})
    }
});

//todo get favourites book of a perticular user
router.get("/get-favourite-books",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const userData=await User.findById(id).populate("favourites");
        const favouritesBooks=userData.favourites;
        return res.json({status:"Success",data:favouritesBooks})

    } catch (error) {
        res.status(500).json({messages:"Internal server error"})
    }
})



export default router;