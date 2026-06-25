dotenv.config();
import express from 'express';
import dotenv from 'dotenv'
import { error } from 'node:console';
const app=express();
app.use(express.json());
import autho from '../backend/src/route/main.ts';
import booko from '../backend/src/route/booking.ts';
const PORT=process.env.PORT;
if(!process.env.PORT){
    throw error("Can,t Access port");
}
app.use(express.json());

app.use("/auth",autho);
app.use("/book",booko);

app.listen(PORT,()=>{
    console.log(`Server is running on this ${PORT}`);
})



