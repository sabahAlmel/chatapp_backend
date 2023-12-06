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
app.use(express.json());
import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer(app);

const io = new Server(httpServer, { cors: { origin: "*" } });

httpServer.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

io.on("connection", (socket) => {
  console.log("connected to socket " + socket.id);
  // socket.emit("data", "first emit");
  socket.on("realtime", (data) => {
    console.log(data);
    io.emit("data", data);
  });
});
