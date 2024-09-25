
import { DataTypes } from '../config/database/db.js'
import { sequelize } from '../config/database/db.js';
import { Usuario } from './users.js';

export const Profesional = sequelize.define('Profesional', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    numero_matricula: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'profesionales',
    freezeTableName: true,
    underscored: true,
});

Profesional.belongsTo(Usuario, { foreignKey: 'usuario_id' });

