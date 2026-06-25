dotenv.config();
import express from 'express';
import dotenv from 'dotenv'
import { error } from 'node:console';
const app=express();
app.use(express.json());
const PORT=process.env.PORT;
if(!process.env.PORT){
    throw error("Can,t Access port");
}


app.use("/auth",);

app.listen(PORT,()=>{
    console.log(`Server is running on this port`);
})



