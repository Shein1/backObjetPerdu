import { Router } from 'express';
import FoundObject from '../models/object';
import Sequelize, { Op } from 'sequelize';

let api = Router();

/**
  @ Get list of lost object
**/

api.get('/', async (req, res) => {
  let objects = await FoundObject.findAll({
    where: {
      returnDate: null
    }
  });
  res.json({ objects });
});

/**
  @ Get list of lost object by stations
**/

api.get('/station/:id', async (req, res) => {
  let objects = await FoundObject.findAll({
    where: {
      station: req.params.id
    }
  });
  res.json({ objects });
});

export default api;
