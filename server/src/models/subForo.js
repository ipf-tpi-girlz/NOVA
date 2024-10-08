
import { sequelize } from '../config/database/db.js';
import { DataTypes } from '../config/database/db.js';

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
<<<<<<< HEAD
    categoria_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "categorias_foro",
            key: "id"
        }
    },
=======
>>>>>>> 02e633c8736f4ce3db609555dc79f455f338683b
    moderador_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "usuarios",
            key: "id"
        }
<<<<<<< HEAD
=======
    },
    foro_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "foros",
            key: "id"
        }
>>>>>>> 02e633c8736f4ce3db609555dc79f455f338683b
    }
}, {
    tableName: 'sub_foros',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

