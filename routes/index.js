import { Router } from 'express';
import lostObject from './found_object';
import user from './user';

let api = Router();

/**
  @ First route of the API
**/

api.get('/', (req, res) => {
  res.json({
    hi: `Welcome to the api of lost object, there is 2 main routes : /lost_object to interact with all lost_object in database & /user to find out about users & alerts`
  });
});

/**
  @ Use of all routes of lostObject
**/

api.use('/lost_object', lostObject);
api.use('/user', user);

export default api;
