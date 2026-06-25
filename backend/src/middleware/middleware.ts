dotenv.config();
import dotenv from 'dotenv'
import express, {type Request,type Response,type NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { error } from 'node:console';
if(!process.env.JWT_SECRET){
    throw error("Can,t Access jwt secret");
}
const JWT_SECRET=process.env.JWT_SECRET;


declare global{
    namespace Express{
        interface Request{
            username:string
        }
    }
}

export function Middleware(req:Request,res:Response,next:NextFunction){
    const token=req.body;
    if(!token){
        return res.status(402).json({
            success:false,
            message:"Please enter the authorized token"
        })
    }
    /* Bearere wala control karo */
    try{
        const decode=jwt.verify(token,JWT_SECRET) as JwtPayload;
        if(!decode || !decode.username){
            return res.status(402).json({
                success:false,
                message:"Jwt verify failed please check the token"
            })
        }
        req.username=decode.username;
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}