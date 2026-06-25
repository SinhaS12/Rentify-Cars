dotenv.config();
import dotenv from 'dotenv'
import express from 'express';
import { booking_val } from '../validation/booking';
import { error } from 'node:console';
import {prisma} from '../db';
import { Middleware } from '../middleware/middleware';
const router = express.Router();
if(!process.env.JWT_SECRET){
    throw error("Can,t Access jwt secret");
}
const JWT_SECRET=process.env.JWT_SECRET;

router.post("/booking",Middleware, async (req, res) => {
    const main = booking_val.safeParse(req.body);
    if (!main.success) {
        return res.status(402).json({
            success: false,
            message: "Please check the inputs"
        })
    }
    const { carName, days, rentPerDay } = main.data;
    try {
        const new_rental=await prisma.bookings.create({
            data:{
                car_name:carName,
                rent_per_day:rentPerDay,
                days:days,
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
})

router.get("/booking",Middleware, async (req, res) => {

    try {


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
})

router.put("/bookings/:bookingId",Middleware, async (req, res) => {
    const main = booking_val.safeParse(req.body);
    if (!main.success) {
        return res.status(402).json({
            success: false,
            message: "Please check the inputs"
        })
    }
    const { carName, days, rentPerDay } = main.data;
    try {


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
})


router.delete("/bookings/:bookingId", Middleware,async (req, res) => {

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