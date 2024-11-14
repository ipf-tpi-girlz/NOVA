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
import articleRouter from "../routes/article.routes.js";
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
app.use("/foro", postRouter);
app.use("/comunity", routerComunity);
app.use("/comunity-post", routerPostComunity);
app.use("/auth", authRoutes);
app.use("/article", articleRouter);

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Solicitud de ayuda
  socket.on("request_help", () => {
    activeHelpRequests[socket.id] = true;
    socket.broadcast.emit("help_requested", {
      message: "un usuario necesita ayuda",
    });
  });

  // Aceptar ayuda
  socket.on("accept_help", (data) => {
    const requesterSocketId = data.requesterId;

    if (activeHelpRequests[requesterSocketId]) {
      io.to(requesterSocketId).emit("help_accepted", {
        message: "un usuario quiere ayudarte",
        helperId: socket.id,
      });
      delete activeHelpRequests[requesterSocketId]; // Eliminar la solicitud activa

      // Crear sala de chat entre el solicitante y el ayudante
      socket.join(`chat_${requesterSocketId}_${socket.id}`);
      io.to(requesterSocketId).join(`chat_${requesterSocketId}_${socket.id}`);
    }
  });

  // Mensajes en el chat
  socket.on("send_message", (data) => {
    const { chatRoom, message } = data;
    io.to(chatRoom).emit("receive_message", { message });
  });

  // Desconexión del cliente
  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});
server.listen(config.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});
