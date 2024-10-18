import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';
import Conversacion from './chat.js';
import Usuario from './users.js';

const Mensaje = sequelize.define('Mensaje', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    conversacion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Conversacion,
            key: 'id',
        },
    },
    remitente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    enviado_en: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    modelName: 'Mensaje',
    freezeTableName: true
});

export default Mensaje;
