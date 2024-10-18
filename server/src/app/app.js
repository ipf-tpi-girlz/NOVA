import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import config from "../config/config.js";
import cookieParser from "cookie-parser";
import path from "path";


export const app = express();

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(
  session({
    secret: config.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 3600000,
    },
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Hacer la carpeta 'uploads' accesible públicamente
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//! RUTAS
app.use("/users", UserRouter);
app.use("/foro", foroRouter);


app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});
