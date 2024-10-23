import { DataTypes } from "../config/database/db.js";
import { sequelize } from "../config/database/db.js";
import PublicacionComunidad from "./post.community.js";
import Usuario from "./users.js";

const Comentario = sequelize.define(
  "Comentario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    publicacion_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PublicacionComunidad,
        key: "id",
      },
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: "id",
      },
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    modelName: "Comentario",
    freezeTableName: true,
  }
);

export default Comentario;
