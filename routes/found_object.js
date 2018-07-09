import { Router } from 'express';
import FoundObject from '../models/object';
import Sequelize, { Op } from 'sequelize';
import Querystring from 'querystring';

let api = Router();

/**
  @ Get list of lost object of the database
  @ There is a possibility of adding query params ( like station, typeObject, natureObject ) these queries are optional and independant
  @ The order is by id descending
**/

api.get('/', async (req, res) => {
  console.log(req.query);
  let objects = await FoundObject.findAll({
    where: {
      station: req.query.station
        ? capitalizeFirstLetter(req.query.station)
        : { [Op.ne]: null },
      typeObject: req.query.typeObject
        ? capitalizeFirstLetter(req.query.typeObject)
        : { [Op.ne]: null },
      natureObject: req.query.natureObject
        ? capitalizeFirstLetter(req.query.natureObject)
        : { [Op.ne]: null },
      returnDate: null
    },
    order: [['id', 'DESC']]
  });
  res.json({ objects });
});

/**
  @ Capitalize function
**/

function capitalizeFirstLetter(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default api;
