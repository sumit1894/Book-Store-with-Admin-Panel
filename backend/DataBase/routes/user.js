import { Router } from "express";
import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {authenticateToken} from "./userAuth.js"
const router = Router();


//todo sign-Up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        //check username lenght is  more than 3

        if (username.length < 4) {
            return res
                .status(400)
                .json({ message: "Username should be greater than 3" })
        }

        // check username is already exist?
        const existUsername = await User.findOne({ username: username });
        if (existUsername) {
            return res
                .status(400)
                .json({ message: "Usernamee already exist!" })
        }


        // check email is already exist?
        const existEmail = await User.findOne({ email: email });
        if (existEmail) {
            return res
                .status(400)
                .json({ message: "Email already exist!" })
        }

        //check password lenght is more than 6

        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "password should be greater than 6" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword,
            address: address,
        });
        await newUser.save();
        return res.status(200).json({ message: "SignUp Successfully" });

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error" });
    }
})


//todo sign-in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username })
        if (!existingUser) {
            return res
                .status(400)
                .json({ message: "Invalid credentials" })
        }

        await bcrypt.compare(password, existingUser.password, (error, data) => {
            if (data) {

                const authClaims = [
                    { name: existingUser.username },
                    { role: existingUser.role },
                ];
                const token = jwt.sign({ authClaims }, "bookStore123", {
                    expiresIn: "30d",
                });


                res.status(200).json({
                    id: existingUser._id,
                    role: existingUser.role,
                    token: token
                })
            } else {
                res.status(400).json({ message: "Invalid credentials" })
            }
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error" });

    }
})


//todo get-user-information
router.get("/get-user-information",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const data=await User.findById(id).select(`-password`);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
})

//todo update address
router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
        const{id}=req.headers;
        const {address}=req.body;

        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address update successfully"});
    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
})

export default router;


