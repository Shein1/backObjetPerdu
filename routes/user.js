// @flow
import { Router } from 'express';
import uuid from 'uuid/v4';
import User from '../models/user';
import Sequelize, { Op } from 'sequelize';
import Alert from '../models/alert';
import nodemailer from 'nodemailer';
import FoundObject from '../models/object';

import dotenv from 'dotenv';
dotenv.config();

let api = Router();

/**
  @ Search if the email given by user is already in base
  @ If not, create a new user in db with information the user gave
  @ If yes, create an alert and send alert and user information
**/

api.post('/alert', async (req, res) => {
  const { username, email, nature, station, type } = req.body;
  let userid = uuid();
  try {
    let user = await User.findOne({
      attributes: ['id', 'uuid', 'email', 'username'],
      where: {
        email: email
      }
    });

    if (!user) {
      user = new User({
        uuid: userid,
        email: email,
        username: username
      });
      await user.save();
    }

    try {
      let alert = new Alert({
        natureObject: nature,
        typeObject: type,
        station: station,
        user_id: user.id
      });
      await alert.save();

      res.status(200).json({ alert, user });
    } catch (e) {
      res.status(400);
    }
  } catch (err) {
    res.status(400);
  }
});

/**
  @ Get all alert created
**/

api.get('/alerts', async (req, res) => {
  try {
    let alerts = await Alert.findAll({
      attributes: ['id', 'station', 'typeObject', 'natureObject', 'user_id']
    });

    if (alerts) {
      res.status(200).json({ alerts });
    }

    for (let i = 0; i < alerts.length; i++) {
      try {
        let alertFound = await FoundObject.findOne({
          attributes: ['id'],
          where: {
            natureObject: alerts[i].natureObject,
            typeObject: alerts[i].typeObject,
            station: alerts[i].station
          }
        });

        let userMail = await User.findOne({
          attributes: ['email'],
          where: {
            id: alerts[i].user_id
          }
        });

        if (alertFound) {
          try {
            nodemailer.createTestAccount((err, account) => {
              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.MAIL_ACC, // generated ethereal user
                  pass: process.env.MAIL_PASS // generated ethereal password
                }
              });

              // setup email data with unicode symbols
              let mailOptions = {
                from: '"Lost Object 👻" <shekos9396@gmail.com>', // sender address
                to: userMail.email, // list of receivers
                subject: 'Alert ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>' // html body
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
              });
            });

            try {
              let alertToDelete = await Alert.destroy({
                where: {
                  id: alerts[i].id
                }
              });
              res.status(200);
            } catch (e) {
              res.status(400);
            }
          } catch (e) {
            res.status(400);
          }
        }
      } catch (e) {}
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Get information of the user with his id number
  @ Get is uuid, nickname and email
**/

api.get('/:userid', async (req, res) => {
  try {
    let user = await User.findById(req.params.userid);
    const { uuid, username, email } = user.toJSON();

    if (user) {
      res.status(200).json({ data: { uuid, username, email } });
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
      res.status(200).json({ alerts });
    }
  } catch (e) {
    res.status(400).json({ e });
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
      res.status(200).json({ alerts });
    }
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Update an alert already created
**/

function getAlertFromRec(req) {
  const { id, typeObject, natureObject, station, user_id } = req.body;
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
        res.status(200).json({ updatedAlert });
      });
  } catch (e) {
    res.status(400).json({});
  }
});

/**
  @ Delete the alert of a user
**/

api.delete('/:userid/alert/:alertid', async (req, res) => {
  try {
    let alert = await Alert.findOne({
      attributes: ['id'],
      where: {
        id: req.params.alertid
      }
    });

    if (alert) {
      try {
        let alert = await Alert.destroy({
          where: {
            id: req.params.alertid
          }
        });
        res
          .status(200)
          .json({ succes: 'Alert has been successfully deleted ' });
      } catch (e) {
        res.status(400).json({ err: 'Something went wrong' });
      }
    } else {
      res.status(400).json({ err: "Your alert id don't exist buddy " });
    }
  } catch (e) {
    res.status(400);
  }
});

export default api;
