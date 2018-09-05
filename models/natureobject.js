// @flow
import { Model } from 'sequelize';

export default class NatureObject extends Model {
	static init(sequelize, DataTypes) {
		super.init(
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
					allowNull: false
				},
				natureObject: {
					type: DataTypes.STRING
				}
			},
			{
				sequelize: sequelize
			}
		);
	}
}
