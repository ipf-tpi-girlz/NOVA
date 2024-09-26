
import { sequelize, DataTypes } from '../config/database/db.js';

export const Subforo = sequelize.define('Subforo', {
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
    }
}, {
    tableName: 'subforos',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

