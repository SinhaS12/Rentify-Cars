import express from 'express';
import { signup_val } from '../validation/signup';
import { signin_val } from '../validation/signin';
const router = express.Router();




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


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
})


router.post("/login", async (req, res) => {
    const main=signin_val.safeParse(req.body);
    if(!main.success){
        return res.status(402).json({
            success: false,
            message: "Please check the input"
        })
    }
     const { username, password } = main.data;
    try {


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
})




export default router;