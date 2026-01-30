import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import annotationRoutes from "./routes/annotation.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());


app.use(
  cors({
    origin: "https://annotation-app-weld.vercel.app",
    credentials: true
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/annotations", annotationRoutes);

app.get("/", (req, res) => {
  res.send("Annotation API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);