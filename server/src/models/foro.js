
import { DataTypes } from '../config/database/db.js'
import { sequelize } from '../config/database/db.js';


export const Foro = sequelize.define('foros',
    {
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
        subforo_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "sub_foros",
                key: 'id'
            }
        }
    },
    {
        tableName: 'foros',
        freezeTableName: true,
        underscored: true,
    }
)