// @flow
import { Model } from 'sequelize';

export default class FoundObject extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        date: {
          type: DataTypes.INTEGER
        },
        typeObject: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        natureObject: {
          type: DataTypes.INTEGER,
          allowNull: false
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
