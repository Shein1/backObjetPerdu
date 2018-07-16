import { Model } from 'sequelize';

export default class User extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true
          }
        }
      },
      {
        sequelize: sequelize
      }
    );
  }
}
