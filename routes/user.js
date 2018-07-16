import { Router } from 'express';
import User from '../models/user';
import Sequelize, { Op } from 'sequelize';
import Alert from '../models/alert';

let api = Router();

/**
  @ Get information of the user with his id number
  @ Get is uuid, nickname and email
**/

api.get('/:userid', async (req, res) => {
  try {
    let user = await User.findById(req.params.userid);
    const { uuid, username, email } = user.toJSON();

    if (user) {
      res.json({ data: { uuid, username, email } });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get all alert the user create
**/

api.get('/:userid/alert', async (req, res) => {
  try {
    let alerts = await Alert.findAll({
      where: {
        user_id: req.params.userid
      }
    });

    if (alerts) {
      res.json({ alerts });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get information about a specific alert that he create
**/

api.post('/:userid/alert', (req, res) => {
  const date = req.body.date;
  const typeObject = req.body.typeObject;
  const natureObject = req.body.natureObject;
  const station = req.body.station;
  const user_id = req.body.user_id;

  try {
    Alert.create({
      date: date,
      typeObject: typeObject,
      natureObject: natureObject,
      station: station,
      user_id: user_id
    }).then(newAlert => {
      res.json(newAlert);
    });
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get information about a specific alert that he create
**/

api.get('/:userid/alert/:alertid', async (req, res) => {
  try {
    let alerts = await Alert.findAll({
      where: {
        user_id: req.params.userid,
        id: req.params.alertid
      }
    });

    if (alerts) {
      res.json({ alerts });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get information about a specific alert that he create
**/

function getAlertFromRec(req) {
  const alert = {
    id: req.body.id,
    typeObject: req.body.typeObject,
    natureObject: req.body.natureObject,
    station: req.body.station,
    user_id: req.body.user_id
  };
  return alert;
}

api.patch('/:userid/alert/:alertid', async (req, res) => {
  try {
    let alertUpdated = getAlertFromRec(req);
    let alert = await Alert.findById(req.params.alertid)
      .then(alert => {
        return alert.updateAttributes(alertUpdated);
      })
      .then(updatedAlert => {
        res.json(updatedAlert);
      });
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get information about a specific alert that he create
**/

api.delete('/:userid/alert/:alertid', async (req, res) => {
  try {
    let alert = await Alert.destroy({
      where: {
        id: req.params.alertid
      }
    });
    res.json({ succes: 'Alert has been successfully deleted ' });
  } catch (e) {
    res.status(400).json({});
  }
});

export default api;
