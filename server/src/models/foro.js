import { sequelize } from "../config/database/db.js";
import { DataTypes } from "sequelize";

export const Foro = sequelize.define(
  "Foro",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dueño_f: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      }
    }
  },
  {
    tableName: "foros",
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);
