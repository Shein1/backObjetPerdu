// @flow
import { db as database } from '../models';
import FoundObject from '../models/object';
import TypeObject from '../models/typeobject';
import NatureObject from '../models/natureobject';
import Sequelize, { Op } from 'sequelize';
import Station from '../models/station';
import axios from 'axios';
import colors from 'colors/safe';

import dotenv from 'dotenv';
dotenv.config();

if (!process.env.URL) throw new Error('URL missing');
const url = process.env.URL;

/**
  @ Init of table lostObject with sncf api
**/

database
	.sync()
	.then(async () => {
		axios.get(`${url}`).then(async response => {
			try {
				let data = response.data.records;
				let reversedData = data.reverse();
				for (let i = 0; i < reversedData.length; i++) {
					const name = reversedData[i].fields.gc_obo_gare_origine_r_name;
					const type = reversedData[i].fields.gc_obo_type_c;
					const nature = reversedData[i].fields.gc_obo_nature_c;
					const _date = reversedData[i].fields.date.substr(0, 10);
					const retDate =
						reversedData[i].fields.gc_obo_date_heure_restitution_c;

					if (!retDate) {
						// Check if station already exist in Station table where stationName is the station name that we get from API
						// If not, we create a new station with the name we get and save it in the table

						let station = await Station.findOne({
							attributes: ['id'],
							where: {
								stationName: name
							}
						});

						if (!station) {
							station = new Station({
								stationName: name
							});
							await station.save();
						}

						// Check if objectType already exist in TypeObject table where typeObject is the type that we get from API
						// If not, we create a new typeobject with the name we get and save it in the table

						let objectType = await TypeObject.findOne({
							attributes: ['id'],
							where: {
								typeObject: type
							}
						});

						if (!objectType) {
							objectType = new TypeObject({
								typeObject: type
							});
							await objectType.save();
						}

						// Check if objectNature already exist in NatureObject table where natureObject is the nature that we get from API
						// If not, we create a new objectNature with the name we get and save it in the table

						let objectNature = await NatureObject.findOne({
							attributes: ['id'],
							where: {
								natureObject: nature
							}
						});

						if (!objectNature) {
							objectNature = new NatureObject({
								natureObject: nature,
								type_object_id: objectType.id
							});
							await objectNature.save();
						}

						// We create a new FoundObject and save it in the table FoundObject

						let obj = new FoundObject({
							date: _date,
							typeObject: objectType.id,
							natureObject: objectNature.id,
							station: station.id
						});

						// Check if the object already exists on table, if not, we save the new object

						let existingObject = await FoundObject.findOne({
							attributes: ['id'],
							where: {
								typeObject: objectType.id,
								natureObject: objectNature.id,
								station: station.id,
								date: reversedData[i].fields.date.substr(0, 10)
							}
						});

						if (!existingObject) {
							await obj.save();
						}
					}
				}
			} catch (e) {
				console.error(e);
			}
		});
	})

	.catch(err => {
		console.error(colors.red(`Unable to connect to SQL database: ${err}`));
		process.exit(42);
	});
