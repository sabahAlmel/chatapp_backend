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

const io = new Server(httpServer);
io.on("connection", (socket) => {
  socket.emit("connect", { message: "a new client" });
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
