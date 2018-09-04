// @flow
import { Model } from 'sequelize';

export default class Station extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        stationName: {
          type: DataTypes.STRING
        }
      },
      {
        sequelize: sequelize
      }
    );
  }
}
