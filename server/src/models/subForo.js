import { sequelize } from "../config/database/db.js";
import { DataTypes } from "../config/database/db.js";

export const Subforo = sequelize.define(
  "sub_foros",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    moderador_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    foro_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "foros",
        key: "id",
      },
    },
  },
  {
    tableName: "sub_foros",
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);
