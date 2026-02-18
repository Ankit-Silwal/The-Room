import { Server } from "socket.io";
import http from "http";
export const initSocket=(server:http.Server)=>{
  const io=new Server(server,{
    cors:{
      origin:"*"
    }
  })

  io.on("connection",(socket)=>{
    console.log("Device is connected",socket.id);



    socket.on("disconnect",()=>{
      console.log("Server is disconnected",socket.id);
    })

    socket.on("join-work",(roomId:string)=>{
      socket.join(roomId);
      console.log(`User ${socket.id} joined ${roomId}`);
    })

    socket.on("send-message",({
      roomId,
      message
    })=>{
      io.to(roomId).emit("receive-message",message);
    })

    socket.on("disconnected",()=>{
      console.log("User disconnected",socket.id);
    })
  })

  return io;
}