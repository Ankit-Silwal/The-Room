import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();
app.use(cors({
  origin:["http://localhost:3000"],
  credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
  res.json({
    success:true,
    health:"I am fit as fuck"
  })
})

export default app;