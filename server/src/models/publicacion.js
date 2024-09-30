import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';


export const Publicacion = sequelize.define('publicaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    img: {
        type: DataTypes.STRING(255)
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
            model: "usuarios",
            key: 'id'
        }
    },
    subforoId: {
        type: DataTypes.INTEGER,
        references: {
            model: "sub_foros",
            key: 'id'
        }
    }
}, {
    tableName: 'publicaciones',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});


