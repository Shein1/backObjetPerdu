import express from 'express';
import bodyParser from 'body-parser';
import 'colors';

import dotenv from 'dotenv';
dotenv.config();

import { db } from './models';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

if (!process.env.PORT) throw new Error('PORT missing');
const port = process.env.PORT;

/**
  @ Sync of DB, if the server is up then launching server
**/

db.sync().then(() => {
  app.use('/api', routes);

  app.listen(port, err => {
    if (err) {
      console.log(err.red);
      process.exit(1);
    }

    console.log(`Server is running at port ${port}`.cyan);
  });
});
