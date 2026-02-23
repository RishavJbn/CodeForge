import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import runRouter from "./routes/run.routes.js";

const app = express();

app.use(
  cors({
    origin: "*", // allow frontend access
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "16kb" })); //express.
app.use(cookieParser());

//routes declaration
app.use("/run", runRouter);

export { app };
