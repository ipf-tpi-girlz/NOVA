import { io } from "socket.io-client";

import { profileProf } from "../api/auth.js";
import swal from "sweetalert2";

const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Conectado al servidor de Socket.IO:", socket.id);
});

socket.on("help_requested", (data) => {
  console.log("help_requested", data);
  swal
    .fire({
      color: "text-base",
      background: "bg-base-200",
      title: "Alguien necesita ayuda!",
      confirmButtonText: "Ayudar",
      timer: 100000,
      timerProgressBar: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        socket.emit("help_accept", {
          ayudante: socket.id,
          ayudatario: data.ayudatario,
        });
      } else {
        swal.fire({
          color: "text-base",
          title: "no",
          background: "base-200",
        });
      }
    });
});

socket.on("help_accepted", (data) => {
  console.log(data.message);
});

socket.on("receive_message", (data) => {
  console.log("Nuevo mensaje:", data.message); // Mensaje recibido en el chat
});

export default socket;
