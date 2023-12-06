import express from "express";
const app = express();
import http from 'http'
import dotenv from "dotenv";


import { Server } from "socket.io";
import cors from "cors";
app.use(cors())
dotenv.config();


const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
  }
})


io.on("connection",(socket) =>{
  console.log(`User Connected: ${socket.id}`)

  socket.on("send_message",(msg)=>{
    console.log(`Received message from ${socket.id} : ${msg}`)
    io.emit("receive_message",msg)
  })
})


server.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});




// io.on('connection',(socket)=>{
//   console.log("A user connected")

//   socket.on("chat message", (msg) =>{
//     console.log("message:" + msg);

//     io.emit("chat message",msg)
//   })

//   socket.on('disconnect', ()=>{
//     console.log("User disconnect")
//   })
// })
