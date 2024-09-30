
import { sequelize, DataTypes } from '../config/database/db.js';

export const Subforo = sequelize.define('sub_foros', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "categorias_foro",
            key: "id"
        }
    }
}, {
    tableName: 'sub_foros',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

