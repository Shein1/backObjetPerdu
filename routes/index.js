import { Router } from 'express';
import lostObject from './found_object';
import user from './user';

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
api.use('/user', user);

export default api;
