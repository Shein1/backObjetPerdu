import { Model } from 'sequelize';

export default class Objet extends Model {
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
          allowNull: false
        },
        typeObject: {
          type: DataTypes.STRING,
          allowNull: false
        },
        natureObject: {
          type: DataTypes.STRING,
          allowNull: false
        },
        station: {
          type: DataTypes.STRING,
          allowNull: true
        },
        returnDate: {
          type: DataTypes.DATE
        }
      },
      {
        sequelize: sequelize
      }
    );
  }
}
