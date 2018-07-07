import Sequelize, { Op } from 'sequelize';

import User from './user';
import Alert from './alert';
import FoundObject from './object';

import dotenv from 'dotenv';
dotenv.config();

export const db = new Sequelize(process.env.DATABASE_URL, {
  operatorsAliases: Op,
  define: {
    underscored: true
  }
});

/**
  @Model init
**/
User.init(db, Sequelize);
Alert.init(db, Sequelize);
FoundObject.init(db, Sequelize);

User.hasMany(Alert);
Alert.belongsTo(User, { constraints: false });
