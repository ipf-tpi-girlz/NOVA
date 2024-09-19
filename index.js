import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//RUTAS
app.use("/api", authRouter);
app.use("/", (req, res) => {
  res.send("hola");
});

//SERVIDOR
app.listen(3000, async () => {
  await connectDB();
  console.log("encendido");
});
