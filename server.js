import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});