import { Router } from 'express';
import FoundObject from '../models/object';
import Sequelize, { Op } from 'sequelize';
import Querystring from 'querystring';
import TypeObject from '../models/typeobject';
import NatureObject from '../models/natureobject';
import Station from '../models/station';
import DateObject from '../models/date';

let api = Router();

/**
  @ Get list of lost object of the database
  @ There is a possibility of adding query params ( like station, typeObject, natureObject & date ) these queries are optional and independant
  @ The order is by id ascending
  @ In a information object, query content is written
  @ function isEmpty check if the object given is empty
**/

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

api.get('/', async (req, res) => {
  let { sid, tid, nid, did } = req.query;

  let found_object = await FoundObject.findAll({
    attributes: ['id', 'date', 'station', 'typeObject', 'natureObject'],
    where: {
      station: sid ? sid : { [Op.ne]: null },
      typeObject: tid ? tid : { [Op.ne]: null },
      natureObject: nid ? nid : { [Op.ne]: null },
      date: did ? did : { [Op.ne]: null },
      returnDate: null
    },
    order: [['id', 'asc']]
  });

  if (isEmpty(req.query)) {
    res.json({ found_object });
  } else {
    // Check if the queries in url are those on the array below
    // If not it will send an error
    // If yes, if will try to search in table the query given

    const qp = ['sid', 'tid', 'did', 'nid'];
    let wrongQuery = false;
    for (let params in req.query) {
      if (qp.indexOf(params) === -1) {
        wrongQuery = true;
      }
    }
    if (wrongQuery) {
      res.json({ Error: 'Your query is wrong typed ' });
    } else {
      try {
        // Search if the id given in the url is in the Station table and if it is, it send the attribute stationName
        // stationName is the name of the Station

        let station = await Station.findOne({
          attributes: ['stationName'],
          where: {
            id: sid
          }
        });

        let type = await TypeObject.findOne({
          attributes: ['typeObject'],
          where: {
            id: tid
          }
        });

        let nature = await NatureObject.findOne({
          attributes: ['natureObject'],
          where: {
            id: nid
          }
        });

        let date = await DateObject.findOne({
          attributes: ['date'],
          where: {
            id: did
          }
        });

        // Check if any of query return null
        // If it does, it will return an error
        // If not, it will return the objects with information based on your queries

        if (!station && !type && !nature && !date) {
          res
            .status(400)
            .json({ Error: 'There is no object found with your criteria' });
        } else {
          res.status(200).json({
            found_object,
            information: { station, type, nature, date }
          });
        }
      } catch (e) {
        res
          .status(500)
          .json({ Error: 'Oopsi it seems like there is an unknow error' });
      }
    }
  }
});

/**
  @ Get list of all station
**/

api.get('/stations/', async (req, res) => {
  try {
    let station = await Station.findAll({
      attributes: ['id', 'stationName']
    });

    if (station) {
      res.json({ station });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get information of a specific station
**/

api.get('/station/:stationid', async (req, res) => {
  try {
    let station = await Station.findAll({
      attributes: ['id', 'stationName'],
      where: {
        id: req.params.stationid
      }
    });

    if (station) {
      res.json({ station });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get list of all typeObject
**/

api.get('/types/', async (req, res) => {
  try {
    let type = await TypeObject.findAll({
      attributes: ['id', 'typeObject']
    });

    if (type) {
      res.json({ type });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get information of a specific typeObject
**/

api.get('/type/:typeid', async (req, res) => {
  try {
    let type = await TypeObject.findOne({
      attributes: ['id', 'typeObject'],
      where: {
        id: req.params.typeid
      }
    });

    if (type) {
      res.json({ type });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get list of all object nature
**/

api.get('/natures/', async (req, res) => {
  try {
    let nature = await NatureObject.findAll({
      attributes: ['id', 'natureObject']
    });

    if (nature) {
      res.json({ nature });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get information of a specific object nature
**/

api.get('/nature/:natureid', async (req, res) => {
  try {
    let nature = await NatureObject.findOne({
      attributes: ['id', 'natureObject'],
      where: {
        id: req.params.natureid
      }
    });

    if (nature) {
      res.json({ nature });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get information of a specific date
**/

api.get('/date/:dateid', async (req, res) => {
  try {
    let dateid = await DateObject.findAll({
      attributes: ['id', 'date'],
      where: {
        id: req.params.dateid
      }
    });

    if (dateid) {
      res.json({ dateid });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get list of all dates and their id
**/

api.get('/dates', async (req, res) => {
  try {
    let date = await DateObject.findAll({ attributes: ['id', 'date'] });

    if (date) {
      res.json({ date });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

export default api;
