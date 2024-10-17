// Importaciones de modelos y sequelize
import { Profesional } from "../../models/profesional.js";
import { Localidad } from "../../models/localidades.js";
import { Usuario } from "../../models/users.js";
import { Departamento } from "../../models/departamentos.js";
import { sequelize } from "../../config/database/db.js";
import { Institucion } from "../../models/institucion.js";
import { Comentario } from "../../models/comentario.js";
import { Publicacion } from "../../models/publicacion.js";
import { Respuesta } from "../../models/respuesta.js";
import { PerfilUsuario } from "../../models/perfil.usario.js";
import { interaccion_publicacion } from "../../models/interaccion-PCR.js";
import { Foro } from "../../models/foro.js";
import { Subforo } from "../../models/subforo.js";

// Función para sincronizar tablas y relaciones
export const syncTables = async () => {
  try {
    // Relaciones entre Departamento y Localidad
    Departamento.hasMany(Localidad, {
      foreignKey: "departamento_id",
      as: "localidades",
      onDelete: "CASCADE",
    });
    Localidad.belongsTo(Departamento, {
      foreignKey: "departamento_id",
      as: "departamento",
    });

    // Relación uno a uno: Usuario y Profesional
    Usuario.hasOne(Profesional, {
      foreignKey: "usuario_id",
      as: "profesional",
      onDelete: "CASCADE",
    });
    Profesional.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

    // Relación uno a uno: Usuario y Institución
    Usuario.hasOne(Institucion, {
      foreignKey: "usuario_id",
      as: "institucion",
      onDelete: "CASCADE",
    });
    Institucion.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

    // Relaciones entre Localidad y Usuario
    Localidad.hasMany(Usuario, {
      foreignKey: "localidad_id",
      onDelete: "SET NULL",
    });
    Usuario.belongsTo(Localidad, { foreignKey: "localidad_id" });

    // Relaciones entre Usuario y Publicación
    Usuario.hasMany(Publicacion, {
      foreignKey: "usuario_id",
      onDelete: "CASCADE",
    });
    Publicacion.belongsTo(Usuario, { foreignKey: "usuario_id" });

    // Relaciones entre Usuario y Comentario
    Usuario.hasMany(Comentario, {
      foreignKey: "usuario_id",
      onDelete: "CASCADE",
    });
    Comentario.belongsTo(Usuario, { foreignKey: "usuario_id" });

    // Relaciones entre Publicación y Comentario
    Publicacion.hasMany(Comentario, {
      foreignKey: "publicacion_id",
      onDelete: "CASCADE",
    });
    Comentario.belongsTo(Publicacion, { foreignKey: "publicacion_id" });

    // Relaciones entre Comentario y Respuesta
    Comentario.hasMany(Respuesta, {
      foreignKey: "comentario_id",
      onDelete: "CASCADE",
    });
    Respuesta.belongsTo(Comentario, {
      foreignKey: "comentario_id",
      onDelete: "CASCADE",
    });

    // Relaciones entre Usuario y Respuesta
    Usuario.hasMany(Respuesta, {
      foreignKey: "usuario_id",
      onDelete: "CASCADE",
    });
    Respuesta.belongsTo(Usuario, { foreignKey: "usuario_id" });

    // Relación entre PerfilUsuario y Usuario
    PerfilUsuario.belongsTo(Usuario, {
      foreignKey: "usuario_id",
      as: "usuario",
    });
    Usuario.hasMany(PerfilUsuario, {
      foreignKey: "usuario_id",
      as: "perfiles",
      onDelete: "CASCADE",
    });

    // Relaciones entre Usuario y Foro
    Usuario.hasMany(Foro, {
      foreignKey: "usuario_id",
      onDelete: "CASCADE",
    });
    Foro.belongsTo(Usuario, { foreignKey: "usuario_id" });

    // Relaciones entre Usuario y SubForo
    Usuario.hasMany(Subforo, {
      foreignKey: "usuario_id",
      onDelete: "CASCADE",
    });
    Subforo.belongsTo(Usuario, { foreignKey: "usuario_id" });

    // Relaciones entre Foro y SubForo
    Foro.hasMany(Subforo, {
      foreignKey: "foro_id",
      onDelete: "CASCADE",
    });
    Subforo.belongsTo(Foro, { foreignKey: "foro_id" });

    Publicacion.hasMany(interaccion_publicacion, {
      foreignKey: "publicacion_id",
      onDelete: "CASCADE",
    });
    interaccion_publicacion.belongsTo(Publicacion, {
      foreignKey: "publicacion_id",
    });
    Comentario.hasMany(interaccion_publicacion, {
      foreignKey: "comentario_id",
      onDelete: "CASCADE",
    });
    interaccion_publicacion.belongsTo(Comentario, {
      foreignKey: "comentario_id",
    });
    Respuesta.hasMany(interaccion_publicacion, {
      foreignKey: "respuesta_id",
      onDelete: "CASCADE",
    });
    interaccion_publicacion.belongsTo(Respuesta, {
      foreignKey: "respuesta_id",
    });

    // Sincronización de tablas
    await sequelize.sync();

    // Ejemplo de creación de departamentos y localidades
    const departamentos = [
      { nombre: "bermejo" },
      { nombre: "formosa" },
      { nombre: "laishi" },
      { nombre: "matacos" },
      { nombre: "pirané" },
      { nombre: "pilagás" },
      { nombre: "pilcomayo" },
      { nombre: "ramón lista" },
    ];
    await Departamento.bulkCreate(departamentos);

    const localidades = [
      // Localidades de Bermejo
      { nombre: "el colorado", departamento_id: 1 },
      { nombre: "villa dos trece", departamento_id: 1 },
      { nombre: "herradura", departamento_id: 1 },

      // Localidades de Formosa
      { nombre: "formosa", departamento_id: 2 },
      { nombre: "san francisco de laishí", departamento_id: 2 },

      // Localidades de Laishi
      { nombre: "san francisco de laishí", departamento_id: 3 },
      { nombre: "villafañe", departamento_id: 3 },

      // Localidades de Matacos
      { nombre: "ingeniero juárez", departamento_id: 4 },
      { nombre: "pozo de mazamorra", departamento_id: 4 },

      // Localidades de Pirané
      { nombre: "pirané", departamento_id: 5 },
      { nombre: "el espinillo", departamento_id: 5 },

      // Localidades de Pilagás
      { nombre: "clorinda", departamento_id: 6 },
      { nombre: "laguna blanca", departamento_id: 6 },

      // Localidades de Pilcomayo
      { nombre: "laguna blanca", departamento_id: 7 },
      { nombre: "general manuel belgrano", departamento_id: 7 },

      // Localidades de Ramón Lista
      { nombre: "el potrerillo", departamento_id: 8 },
      { nombre: "mariano boedo", departamento_id: 8 },
    ];
    await Localidad.bulkCreate(localidades);

    console.log("Sincronizado correctamente");
  } catch (error) {
    console.log("Se produjo un error al sincronizar:", error);
  }
};
