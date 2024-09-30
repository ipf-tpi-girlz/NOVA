import { sequelize } from '../config/database/db.js';
import { DataTypes } from '../config/database/db.js'



export const Usuario = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    razon_social: {
        type: DataTypes.STRING(255)
    },
    mail: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    localidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "localidades",
            key: 'id'
        }
    },
    nro_telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    contrasenia: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('institucion', 'profesional', 'victima'),
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    freezeTableName: true,
    underscored: true,

});



