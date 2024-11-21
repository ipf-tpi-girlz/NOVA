import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import session from "express-session";
import config from "../config/config.js";
import cookieParser from "cookie-parser";
import path from "path";
import UserRouter from "../routes/user.routes.js";
import routerComunity from "../routes/comunity.routes.js";
import routerPostComunity from "../routes/post.comunity.routes.js";
import postRouter from "../routes/post.routes.js";
import authRoutes from "../routes/auth.routes.js";
import routerJoinC from "../routes/join.community.routes.js";
import articleRouter from "../routes/article.routes.js";
import routerComents from "../routes/coments.router.js";
import { time } from "node:console";
export const app = express();
const server = createServer(app);

// MIDDLEWARE
app.use(cookieParser()); // Debe ir antes de session
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Asegúrate de usar express.json() para manejar JSON

//Integracion con Socket.io
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5500", "http://localhost:5173"],
    credentials: true,
  },
});

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
app.use("/coments", routerComents);
app.use("/foro", postRouter);
app.use("/comunity", routerComunity);
app.use("/comunity-post", routerPostComunity);
app.use("/auth", authRoutes);
app.use("/articles", articleRouter);
app.use("/join-community", routerJoinC);

let activeHelpRequests = {};
io.on("connect", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Solicitud de ayuda
  socket.on("help_request", () => {
    console.log("hola");
    activeHelpRequests[socket.id] = false;
    console.log(activeHelpRequests);

    io.emit("help_requested", {
      message: "un usuario necesita ayuda",
      ayudatario: socket.id,
    });
  });

  // Aceptar ayuda
  socket.on("help_accept", (data) => {
    console.log("data", data);

    activeHelpRequests[data.ayudatario] = false;
    console.log("noentedo", data);
    io.emit("help_accepted", "holaMundo");
  });

  socket.on("chat_message", ({ socketId, msg }) => {
    console.log("Mensaje recibido: ", msg, "de: ", socketId);
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0"); // Hora
    const minutes = currentTime.getMinutes().toString().padStart(2, "0"); // Minutos
    const timeString = `${hours}:${minutes}`;
    io.emit("chat_message", { socketId, msg, time: timeString });
  });

  // Desconexión del cliente
  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});
server.listen(config.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});
