import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';
import Usuario from './users.js';
import Comunidad from './comunnity.js';

const ParticipanteComunidad = sequelize.define('ParticipanteComunidad', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comunidad_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Comunidad,
            key: 'id',
        },
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
}, {
    modelName: 'ParticipanteComunidad',
    freezeTableName: true
});

export default ParticipanteComunidad;
