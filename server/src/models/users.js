import { sequelize } from '../config/database/db.js';
import { DataTypes } from '../config/database/db.js'
import { Localidad } from './localidades.js';


export const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    apellido_razon_social: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    localidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Localidad,
            key: 'id'
        }
    },
    numero_telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('institucion', 'profesional', 'victima'),
        allowNull: false
    }
}, {
    tableName: 'Usuario',
    freezeTableName: true,
    underscored: true,

});



