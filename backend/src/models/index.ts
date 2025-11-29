import { Sequelize } from 'sequelize';
import config from '../../config/database';

const sequelize = new Sequelize(config);

const db = {
  sequelize,
  Sequelize
};

export default db;
