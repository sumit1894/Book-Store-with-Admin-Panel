import { Router } from "express";
import User from "../model/userSchema.js";
import Book from "../model/bookSchema.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./userAuth.js"
const router = Router();

//todo book---admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "you are not having access to perform admin work" })
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        await book.save()
        res.status(200).json({ message: "Book added successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server Error!" })
    }
})

//todo update book
router.put("/update-book", authenticateToken, async (req, res) => {
    try {

        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        res.status(200).json({ message: "Book update successfully" })
    } catch (error) {
        res.status(500).json({ message: "An Error occurred" })
    }
})

//todo Delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully!" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
})

//todo get all books
router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createAt: -1 });
        return res.json({
            status: "Success",
            data: books,
        })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
})

//todo get 4 recent  books
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books,
        })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
})

//todo get book by id
router.get("/get-book-by-id/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const book=await Book.findById(id);
        return res.json({
            status:"success",
            data:book,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred" });
        
    }
})


export default router;