// @flow
import { Router } from 'express';
import FoundObject from '../models/object';
import Sequelize, { Op } from 'sequelize';
import Querystring from 'querystring';
import TypeObject from '../models/typeobject';
import NatureObject from '../models/natureobject';
import Station from '../models/station';

let api = Router();

/**
  @ Get list of lost object of the database
  @ There is a possibility of adding query params ( like station, typeObject, natureObject & date ) these queries are optional and independant
  @ The order is by id ascending
  @ In a information object, query content is written
  @ function isEmpty check if the object given is empty
  @ The number of pages is now indicated in the information when you use a query
  @ In the url, there is a params page to indicate in which page you are
  @ sid: Station id, tid: objectType id, nid: objectNature id, did: Date id
  @ Example of request /api/lost_object/page=1/?did=4&tid=4&nid=5&sid=6
**/

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

api.get('/page=:page/', async (req, res) => {
  let { sid, tid, nid, did } = req.query;
  let limit = 10;
  let offset = 0;

  let count = await FoundObject.findAndCountAll().then(async data => {
    let page = req.params.page; // page number
    let pages = Math.ceil(data.count / limit);
    offset = limit * (page - 1);

    let found_object = await FoundObject.findAll({
      attributes: ['id', 'date', 'station', 'typeObject', 'natureObject'],
      where: {
        station: sid ? sid : { [Op.ne]: null },
        typeObject: tid ? tid : { [Op.ne]: null },
        natureObject: nid ? nid : { [Op.ne]: null },
        date: did ? did : { [Op.ne]: null }
      },
      order: [['id', 'asc']],
      limit: limit,
      offset: offset
    });

    let countObject = await FoundObject.findAndCountAll({
      where: {
        station: sid ? sid : { [Op.ne]: null },
        typeObject: tid ? tid : { [Op.ne]: null },
        natureObject: nid ? nid : { [Op.ne]: null },
        date: did ? did : { [Op.ne]: null }
      }
    });

    let pageNb;

    if (countObject.count < 10) {
      pageNb = 1;
    } else if (countObject.count > 10 && countObject.count % limit != 0) {
      pageNb = parseInt(countObject.count / limit) + 1;
    } else {
      pageNb = countObject.count / limit;
    }

    if (isEmpty(req.query)) {
      res.json({
        found_object,
        information: {
          pages: pageNb,
          objects: countObject.count
        }
      });
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

          // Check if any of query return null
          // If it does, it will return an error
          // If not, it will return the objects with information based on your queries

          if (countObject.count === 0) {
            res
              .status(400)
              .json({ Error: 'There is no object found with your criteria' });
          } else {
            if (pageNb == 1) {
              res.status(200).json({
                found_object,
                information: {
                  station,
                  type,
                  nature,
                  date,
                  page: pageNb,
                  objects: countObject.count
                }
              });
            } else {
              res.status(200).json({
                found_object,
                information: {
                  station,
                  type,
                  nature,
                  date,
                  pages: pageNb,
                  objects: countObject.count
                }
              });
            }
          }
        } catch (e) {
          res
            .status(500)
            .json({ Error: 'Oopsi it seems like there is an unknow error' });
        }
      }
    }
  });
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
      res.status(200).json({ station });
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
      res.status(200).json({ station });
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
      res.status(200).json({ type });
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
      res.status(200).json({ type });
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
      attributes: ['id', 'natureObject', 'type_object_id']
    });

    if (nature) {
      res.status(200).json({ nature });
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
      attributes: ['id', 'natureObject', 'type_object_id'],
      where: {
        id: req.params.natureid
      }
    });

    if (nature) {
      res.status(200).json({ nature });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

export default api;
