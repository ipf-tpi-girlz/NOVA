import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';
import Usuario from './users.js';

const Perfil = sequelize.define('Perfil', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    descripcion: DataTypes.TEXT,
    nro_telefono: DataTypes.TEXT,
    nro_matricula: DataTypes.TEXT,
    cuit: DataTypes.TEXT,
    direccion: DataTypes.TEXT,
    rp_legal: DataTypes.TEXT,
    modo_atencion: DataTypes.TEXT,
    servi: DataTypes.TEXT,
    especialidad: DataTypes.TEXT,
}, {
    modelName: 'Perfil',
    freezeTableName: true
});

export default Perfil;
