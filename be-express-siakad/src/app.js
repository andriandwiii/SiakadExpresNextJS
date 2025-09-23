import cors from "cors";
import express from "express";
import logger from "morgan";

import { setResponseHeader } from "./middleware/set-headers.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import masterSiswaRoutes from "./routes/masterSiswaRoutes.js";
import masterKelasRoutes from "./routes/masterKelasRoutes.js";
import masterGuruRoutes from "./routes/masterGuruRoutes.js";

const app = express();

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Timestamp",
      "X-Signature",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionSuccessStatus: 200,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", [setResponseHeader], (req, res) => {
  return res.status(200).json(`Welcome to the server! ${new Date().toLocaleString()}`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/master-siswa", masterSiswaRoutes);
app.use("/api/master-kelas", masterKelasRoutes);
app.use("/api/master-guru", masterGuruRoutes); 

export default app;
