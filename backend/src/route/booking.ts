dotenv.config();
import dotenv from 'dotenv'
import express from 'express';
import { booking_val } from '../validation/booking.ts';
import { error } from 'node:console';
import { prisma } from '../db.ts';
import { Middleware } from '../middleware/middleware.ts';
const router = express.Router();
if (!process.env.JWT_SECRET) {
    throw error("Can,t Access jwt secret");
}
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/booking", Middleware, async (req, res) => {
    const main = booking_val.safeParse(req.body);
    if (!main.success) {
        return res.status(402).json({
            success: false,
            message: "Please check the inputs"
        })
    }
    const { carName, days, rentPerDay } = main.data;
    try {
        const new_rental = await prisma.bookings.create({
            data: {
                userId: req.id,
                car_name: carName,
                rent_per_day: rentPerDay,
                days: days,
                status:"booked",
            },select:{
                car_name:true,
                rent_per_day:true,
                days:true,
                status:true
            }
        })
        return res.status(200).json({
            success:true,
            message:"Booking Done Successfully",
            rental_details:new_rental
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
})

router.get("/booking", Middleware, async (req, res) => {
    const id=req.id;
    try {
        const find_booking=await prisma.bookings.findMany({where:{userId:id}})
        if(!find_booking){
            return res.status(404).json({
                success:false,
                message:"Booking Details got successfully",
                details:find_booking
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
})

router.put("/bookings/:bookingId", Middleware, async (req, res) => {
    const bookingId=req.params.bookingId as string;
    const id=req.id;
    if(!bookingId){
        return res.status(403).json({
            success:false,
            message:"Please enter the booking id"
        })
    }
    const main = booking_val.safeParse(req.body);
    if (!main.success) {
        return res.status(402).json({
            success: false,
            message: "Please check the inputs"
        })
    }
    const { carName, days, rentPerDay } = main.data;
    try {
        const check_owner=await prisma.bookings.findUnique({where:{id:bookingId},select:{car_name:true,days:true,rent_per_day:true,userId:true}});
        if(!check_owner){
            return res.status(402).json({
                success:false,
                message:"Booking not found"
            })
        }
        if(check_owner.userId!=id){
            return res.status(404).json({
                success:false,
                message:"Only owner can change the Booking details"
            })
        }
        const updated_booking = await prisma.bookings.update({
            where: { id: bookingId },
            data: {
                car_name: carName,
                days: days,
                rent_per_day: rentPerDay
            },
            select: {
                car_name: true,
                days: true,
                rent_per_day: true,
                userId: true
            }
        });
        return res.status(200).json({
            success:true,
            message:"Booking updated successfully",
            details:updated_booking
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
})


router.delete("/bookings/:bookingId", Middleware, async (req, res) => {
    const bookingId=req.params.bookingId as string;
    const id=req.id;
    if(!bookingId){
        return res.status(404).json({
            success:false,
            message:"Please Enter the booking id"
        })
    }
    try {
        const find_id=await prisma.bookings.findUnique({where:{id:bookingId}})
        if(!find_id){
            return res.status(404).json({
                success:false,
                message:"Booking not found"
            })
        }
        if(find_id.userId!=id){
            return res.status(403).json({
                success:false,
                message:"Not Allowed"
            })
        }
        await prisma.bookings.delete({where:{id:bookingId}})
        return res.status(200).json({
            success:true,
            message:"Booking deleted successfully"
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