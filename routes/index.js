import { Router } from 'express';
import lostObject from './found_object';

let api = Router();

/**
  @ First route of the API
**/

api.get('/', (req, res) => {
  res.json({ hi: `Welcome to the api of lost object` });
});

/**
  @ Use of all routes of lostObject
**/

api.use('/lost_object', lostObject);

export default api;
