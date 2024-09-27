import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';


export const Publicacion = sequelize.define('Publicacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Usuario",
            key: 'id'
        }
    },
    subforoId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Subforo",
            key: 'id'
        }
    }
}, {
    tableName: 'publicaciones',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});


