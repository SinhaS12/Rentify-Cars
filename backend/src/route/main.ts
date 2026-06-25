dotenv.config();
import dotenv from 'dotenv'
import express from 'express';
import { signup_val } from '../validation/signup';
import { signin_val } from '../validation/signin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {prisma} from '../db';
import { error } from 'node:console';
const router = express.Router();

if(!process.env.JWT_SECRET){
    throw error("Can,t Access jwt secret");
}
const JWT_SECRET=process.env.JWT_SECRET;



router.post("/signup", async (req, res) => {
    const main = signup_val.safeParse(req.body);
    if (!main.success) {
        return res.status(402).json({
            success: false,
            message: "Please check the input"
        })
    }
    const { username, password } = main.data;
    try {
        const old_user=await prisma.user.findUnique({where:{username}});
        if(old_user){
            return res.status(402).json({
                success:false,
                message:"User Already Exist"
            })
        }
        const hash=await bcrypt.hash(password,10);
        const new_user=await prisma.user.create({
            data:{
                username,
                password:hash
            },
            select:{
                username:true
            }
        })
        const token=jwt.sign({userId:new_user},JWT_SECRET);
        return res.status(200).json({
            success:true,
            message:"Signup Successfully Done",
            owner:new_user,
            token:token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
})


router.post("/login", async (req, res) => {
    const main = signin_val.safeParse(req.body);
    if (!main.success) {
        return res.status(402).json({
            success: false,
            message: "Please check the input"
        })
    }
    const { username, password } = main.data;
    try {
        const find_exist=await prisma.user.findUnique({where:{username}});
        if(!find_exist){
            return res.status(402).json({
                success:false,
                message:"User Does not exists"
            })
        }
        const compare=await bcrypt.compare(password,find_exist.password);
        if(!compare){
            return res.status(404).json({
                success:false,
                message:"Password Incorrect Please Check"
            })
        }
        const token=jwt.sign({username:username},JWT_SECRET);
        return res.status(200).json({
            success:true,
            message:"Signin Successfully Done",
            token:token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
})




export default router;