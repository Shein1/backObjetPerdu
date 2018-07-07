import { Router } from 'express';
import lostObject from './found_object';

let api = Router();

api.get('/', (req, res) => {
  res.json({ hi: 'Welcome to the api of lost object' });
});

api.use('/lost_object', lostObject);
// api.use('/stores', store);
// api.use('/auth', auth);

export default api;
