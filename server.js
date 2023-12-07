import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    console.log(`room: ${data.room}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("recieve_message", {
      text: data.text,
      sender: "User 1",
    });
  });
});

httpServer.listen(process.env.PORT);
