import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import config from "../config/config.js";
import cookieParser from "cookie-parser";
import { usersRouter } from "../routers/users.routes.js";
import { subForoRouter } from "../routers/subforo.routes.js";
import { foroRouter } from "../routers/foro.routes.js";
import { authRouter } from "../routers/auth.routes.js";
import { comentRouter } from "../routers/coments.routes.js";
import { postRouter } from "../routers/post.routes.js";
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
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // Asegúrate de que 'uploads' sea accesible desde la raíz

//! RUTAS
app.use("/users", usersRouter);
app.use("/subforo", subForoRouter);
app.use("/foro", foroRouter);
app.use("/auth", authRouter);
app.use("/coments", comentRouter);
app.use("/post", postRouter);

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});
