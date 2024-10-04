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
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "usuarios",
            key: 'id'
        }
    },
    subforo_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "sub_foros",
            key: 'id'
        }
    }
}, {
    tableName: 'publicaciones',
    freezeTableName: true,
    underscored: true
});


