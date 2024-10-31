import { sequelize } from "./db.js";
import Usuario from "../../models/users.js";
import Perfil from "../../models/profile.js";
import Publicacion from "../../models/post.js";
import PublicacionImagen from "../../models/postImg.js";
import Reaccion from "../../models/reacciones.js";
import Comentario from "../../models/coments.js";
import Conversacion from "../../models/chat.js";
import InformacionProfesional from "../../models/info.js";
import Comunidad from "../../models/comunnity.js";
import PublicacionComunidad from "../../models/post.community.js";
import ParticipanteComunidad from "../../models/participan.comunity.js";
import Mensaje from "../../models/message.js";

// Función para sincronizar tablas y relaciones
export const syncTables = async () => {
  try {
    // Usuario -> Perfil (One-to-One)
    Usuario.hasOne(Perfil, { foreignKey: "usuario_id" });
    Perfil.belongsTo(Usuario, { foreignKey: "usuario_id" });

    // Usuario -> Publicacion (One-to-Many)
    Usuario.hasMany(Publicacion, { foreignKey: "usuario_id" });
    Publicacion.belongsTo(Usuario, { foreignKey: "usuario_id" });

    // Publicacion -> PublicacionImagen (One-to-Many)
    Publicacion.hasMany(PublicacionImagen, { foreignKey: "publicacion_id" });
    PublicacionImagen.belongsTo(Publicacion, { foreignKey: "publicacion_id" });

    // Publicacion -> Reaccion (One-to-Many)
    Publicacion.hasMany(Reaccion, { foreignKey: "publicacion_id" });
    Reaccion.belongsTo(Publicacion, { foreignKey: "publicacion_id" });

    // Usuario -> Reaccion (One-to-Many)
    Usuario.hasMany(Reaccion, { foreignKey: "usuario_id" });
    Reaccion.belongsTo(Usuario, { foreignKey: "usuario_id" });

    // Publicacion -> Comentario (One-to-Many)
    Publicacion.hasMany(Comentario, { foreignKey: "publicacion_id" });
    Comentario.belongsTo(Publicacion, { foreignKey: "publicacion_id" });

    // Comentario -> Comentario (Self-referencing)
    Comentario.hasMany(Comentario, { foreignKey: "comentario_padre_id" });
    Comentario.belongsTo(Comentario, { foreignKey: "comentario_padre_id" });

    // Usuario -> Conversacion (One-to-Many, user can be either usuario1 or usuario2)
    Usuario.hasMany(Conversacion, { foreignKey: "usuario1_id" });
    Conversacion.belongsTo(Usuario, { foreignKey: "usuario1_id" });

    Usuario.hasMany(Conversacion, { foreignKey: "usuario2_id" });
    Conversacion.belongsTo(Usuario, { foreignKey: "usuario2_id" });

    // Conversacion -> Mensaje (One-to-Many)
    Conversacion.hasMany(Mensaje, { foreignKey: "conversacion_id" });
    Mensaje.belongsTo(Conversacion, { foreignKey: "conversacion_id" });

    // Usuario -> Mensaje (One-to-Many)
    Usuario.hasMany(Mensaje, { foreignKey: "remitente_id" });
    Mensaje.belongsTo(Usuario, { foreignKey: "remitente_id" });

    // Usuario -> InformacionProfesional (One-to-One)
    Usuario.hasOne(InformacionProfesional, { foreignKey: "profesional_id" });
    InformacionProfesional.belongsTo(Usuario, { foreignKey: "profesional_id" });

    // Usuario -> Comunidad (One-to-Many, user is the moderator)
    Usuario.hasMany(Comunidad, { foreignKey: "moderador_id" });
    Comunidad.belongsTo(Usuario, { foreignKey: "moderador_id" });

    // Comunidad -> PublicacionComunidad (One-to-Many)
    Comunidad.hasMany(PublicacionComunidad, { foreignKey: "comunidad_id" });
    PublicacionComunidad.belongsTo(Comunidad, { foreignKey: "comunidad_id" });

    // Usuario -> PublicacionComunidad (One-to-Many)
    Usuario.hasMany(PublicacionComunidad, { foreignKey: "usuario_id" });
    PublicacionComunidad.belongsTo(Usuario, { foreignKey: "usuario_id" });

    // Comunidad -> ParticipanteComunidad (One-to-Many)
    Comunidad.hasMany(ParticipanteComunidad, { foreignKey: "comunidad_id" });
    ParticipanteComunidad.belongsTo(Comunidad, { foreignKey: "comunidad_id" });

    // Usuario -> ParticipanteComunidad (One-to-Many)
    Usuario.hasMany(ParticipanteComunidad, { foreignKey: "usuario_id" });
    ParticipanteComunidad.belongsTo(Usuario, { foreignKey: "usuario_id" });

    // Sincronización de tablas
    await sequelize.sync();

    console.log("Sincronizado correctamente");
  } catch (error) {
    console.log("Se produjo un error al sincronizar:", error);
  }
};
