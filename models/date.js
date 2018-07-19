import { Model } from 'sequelize';

export default class DateObject extends Model {
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
          type: DataTypes.STRING
        }
      },
      {
        sequelize: sequelize
      }
    );
  }
}
