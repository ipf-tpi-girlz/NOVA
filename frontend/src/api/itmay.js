// io.on("connection", (socket) => {
//     console.log(`Cliente conectado: ${socket.id}`);

//     // Solicitud de ayuda
//     socket.on("request_help", () => {
//       activeHelpRequests[socket.id] = true;
//       socket.broadcast.emit("help_requested", {
//         message: "un usuario necesita ayuda",
//       });
//     });

//     // Aceptar ayuda
//     socket.on("accept_help", (data) => {
//       const requesterSocketId = data.requesterId;

//       if (activeHelpRequests[requesterSocketId]) {
//         io.to(requesterSocketId).emit("help_accepted", {
//           message: "un usuario quiere ayudarte",
//           helperId: socket.id,
//         });
//         delete activeHelpRequests[requesterSocketId]; // Eliminar la solicitud activa

//         // Crear sala de chat entre el solicitante y el ayudante
//         socket.join(`chat_${requesterSocketId}_${socket.id}`);
//         io.to(requesterSocketId).join(`chat_${requesterSocketId}_${socket.id}`);
//       }
//     });

//     // Mensajes en el chat
//     socket.on("send_message", (data) => {
//       const { chatRoom, message } = data;
//       io.to(chatRoom).emit("receive_message", { message });
//     });

//     // Desconexión del cliente
//     socket.on("disconnect", () => {
//       console.log(`Cliente desconectado: ${socket.id}`);
//     });
//   });
