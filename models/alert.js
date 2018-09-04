// @flow
import { Model } from 'sequelize';

export default class Alert extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        typeObject: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        natureObject: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        station: {
          type: DataTypes.INTEGER,
          allowNull: true
        }
      },
      {
        sequelize: sequelize
      }
    );
  }
}
