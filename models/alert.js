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
        date: {
          type: DataTypes.DATE,
          allowNull: true
        },
        typeObject: {
          type: DataTypes.STRING,
          allowNull: true
        },
        natureObject: {
          type: DataTypes.STRING,
          allowNull: true
        },
        station: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        sequelize: sequelize
      }
    );
  }
}
