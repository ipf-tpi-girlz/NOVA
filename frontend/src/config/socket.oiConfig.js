import { io } from "socket.io-client";

import swal from "sweetalert2";

const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Conectado al servidor de Socket.IO:", socket.id);
});

socket.on("help_requested", (data) => {
  if (data.ayudatario !== socket.id) {
    console.log("help_requested", data);
    swal
      .fire({
        background: "#fce7f3",
        showConfirmButton: true,
        confirmButtonColor: "#ec4899",
        buttonsStyling: true,
        html:
          '<h1 class="text-lg text-pink-950 font-serif font-bold">Alerta: Red de contención </h1>' +
          '<p class="text-lg  font-serif  text-pink-950 font-semibold">¿Te gustaría ayudar a esta persona?</p>' +
          '<p class="text-sm mt-0 font-serif text-pink-950">Un usuario esta solicitando ayuda en un momento de crisis emocional</p>',

        timer: 100000,
        timerProgressBar: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          socket.emit("help_accept", {
            ayudante: socket.id,
            ayudatario: data.ayudatario,
          });
        }
      });
  }
});

socket.on("help_accepted", (data) => {
  console.log(data.message);
});

socket.on("receive_message", (data) => {
  console.log("Nuevo mensaje:", data.message); // Mensaje recibido en el chat
});

export default socket;
