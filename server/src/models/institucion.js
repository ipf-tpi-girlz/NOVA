import { DataTypes } from '../config/database/db.js'
import { sequelize } from '../config/database/db.js';

export const Institucion = sequelize.define('instituciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: 'id'
        }
    },
    cuit: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    rp_legal: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    modo_atencion: {
        type: DataTypes.ENUM('presencial', 'virtual'),
    },
<<<<<<< HEAD
=======
    nro_telefono: {
        type: DataTypes.STRING(20),
    },
>>>>>>> 02e633c8736f4ce3db609555dc79f455f338683b
    servi: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'instituciones',
    freezeTableName: true,
    underscored: true,
});

