import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../config.js'
import { tablesAndRelation } from './sync.js';

export const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
  }
);

// Función para conectar a la base de datos
export const conectionDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync()
    await tablesAndRelation();
    console.log('Conexion a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}
conectionDB()

export { Model, DataTypes }

