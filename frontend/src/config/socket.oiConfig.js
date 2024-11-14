import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Conectado al servidor de Socket.IO:", socket.id);
});

socket.on("help_requested", (data) => {
  console.log(data.message);
});

socket.on("help_accepted", (data) => {
  console.log(data.message);
});

socket.on("receive_message", (data) => {
  console.log("Nuevo mensaje:", data.message); // Mensaje recibido en el chat
});

export default socket;
