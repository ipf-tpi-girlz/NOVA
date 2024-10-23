import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import config from "../config/config.js";
import cookieParser from "cookie-parser";
import path from "path";
import UserRouter from "../routes/user.routes.js";
import routerComunity from "../routes/comunity.routes.js";
import routerPostComunity from "../routes/post.comunity.routes.js";
import postRouter from "../routes/post.routes.js";
import authRoutes from "../routes/auth.routes.js";

export const app = express();

// MIDDLEWARE
app.use(cookieParser()); // Debe ir antes de session
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Asegúrate de usar express.json() para manejar JSON

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
      maxAge: 3600000, // 1 hora
    },
  })
);

// Logging middleware
app.use(morgan("dev"));

// Hacer la carpeta 'uploads' accesible públicamente
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//! RUTAS
app.use("/users", UserRouter);
app.use("/foro", postRouter);
app.use("/comunity", routerComunity);
app.use("/comunity-post", routerPostComunity);
app.use("/auth", authRoutes);

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});
