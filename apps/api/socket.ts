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

    socket.on("join-work",(roomId:string,username:string)=>{
      socket.join(roomId);
      socket.data.username=username;
      socket.data.roomId=roomId;
      console.log(`User ${socket.id} joined ${roomId}`);

      socket.to(roomId).emit("receive-message",{
        user:"System",
        message:`${username} joined the freaking room`
      })
    })

    socket.on("send-message",({
      message
    })=>{
      const roomId=socket.data.roomId
      const username=socket.data.username
      io.to(roomId).emit("receive-message",{
        user:username,
        message
      });
    })

    socket.on("disconnected",()=>{
      console.log("User disconnected",socket.id);
    })
  })

  return io;
}