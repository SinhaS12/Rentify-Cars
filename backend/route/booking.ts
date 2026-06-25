import express from 'express';
import { booking_val } from '../validation/booking';
const router=express.Router();


router.post("/booking",async(req,res)=>{
    const main=booking_val.safeParse(req.body);
    if(!main.success){
        return res.status(402).json({
            success:false,
            message:"Please check the inputs"
        })
    }
    const {carName,days,rentPerDay}=main.data;
    try{
      

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
})

router.get("/booking",async(req,res)=>{
    
    try{
      

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
})

router.put("/bookings/:bookingId",async(req,res)=>{
    const main=booking_val.safeParse(req.body);
    if(!main.success){
        return res.status(402).json({
            success:false,
            message:"Please check the inputs"
        })
    }
    const {carName,days,rentPerDay}=main.data;
    try{
      

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
})


router.delete("/bookings/:bookingId",async(req,res)=>{
    
    try{
      

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
})



export default router;