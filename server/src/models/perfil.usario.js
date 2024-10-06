import { DataTypes } from "../config/database/db.js";
import { sequelize } from "../config/database/db.js";

export const PerfilUsuario = sequelize.define(
  "perfiles_usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(255),
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
  },
  {
    tableName: "perfiles_usuarios",
    freezeTableName: true,
    underscored: true,
  }
);
