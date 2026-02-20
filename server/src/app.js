import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();


app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your Vite frontend
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "16kb" })); //express.
app.use(cookieParser());

//routes declaration


//https://localhost:8000/api/v1/dailylog
export { app };
