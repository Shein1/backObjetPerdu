// @flow
import { db as database } from '../models';
import FoundObject from '../models/object';
import TypeObject from '../models/typeobject';
import NatureObject from '../models/natureobject';
import Sequelize, { Op } from 'sequelize';
import Station from '../models/station';
import DateObject from '../models/date';
import axios from 'axios';

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
        for (let i = 0; i < data.length; i++) {
          const name = data[i].fields.gc_obo_gare_origine_r_name;
          const type = data[i].fields.gc_obo_type_c;
          const nature = data[i].fields.gc_obo_nature_c;
          const date_id = data[i].fields.date.substr(0, 10);
          const retDate = data[i].fields.gc_obo_date_heure_restitution_c;

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

            // Check if objectDate already exist in DateObject table where date is the date that we get from API
            // If not, we create a new objectDate with the name we get and save it in the table

            let objectDate = await DateObject.findOne({
              attributes: ['id'],
              where: {
                date: date_id
              }
            });

            if (!objectDate) {
              objectDate = new DateObject({
                date: date_id
              });
              await objectDate.save();
            }

            // We create a new FoundObject and save it in the table FoundObject

            let obj = new FoundObject({
              date: objectDate.id,
              typeObject: objectType.id,
              natureObject: objectNature.id,
              station: station.id
            });
            await obj.save();
          }
        }
      } catch (e) {
        console.error(e);
      }
    });
  })

  .catch(err => {
    console.error(`Unable to connect to SQL database: ${err}`.red);
    process.exit(42);
  });
