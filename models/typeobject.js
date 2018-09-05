// @flow
import { Model } from 'sequelize';

export default class TypeObject extends Model {
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
					type: DataTypes.STRING
				}
			},
			{
				sequelize: sequelize
			}
		);
	}
}
