
import { DataTypes } from '../config/database/db.js'
import { sequelize } from '../config/database/db.js';


export const CategoriaForo = sequelize.define('categorias_foro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'categorias_foro',
    freezeTableName: true,
    underscored: true
});