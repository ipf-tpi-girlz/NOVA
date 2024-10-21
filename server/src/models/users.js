import { sequelize } from "../config/database/db.js";
import { DataTypes } from "../config/database/db.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isIn: [["institucion", "profesional", "victima"]],
      },
    },
    img: DataTypes.TEXT,
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    mail: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    contrasenia: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    genero: DataTypes.TEXT,
    departamento: DataTypes.TEXT,
    localidad: DataTypes.TEXT,
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    modelName: "Usuario",
    freezeTableName: true,
  }
);

export default Usuario;
