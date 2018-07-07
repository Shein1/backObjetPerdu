import { db as database } from '../models';
import Objets from '../models/object';
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

database
  .sync()
  .then(async () => {
    let URL = process.env.URL;

    axios.get(`${URL}`).then(async response => {
      const res = response.data.records;
      for (var i = 0; i < res.length; i++) {
        let _ = new Objets({
          date: res[i].fields.date,
          typeObject: res[i].fields.gc_obo_type_c,
          natureObject: res[i].fields.gc_obo_nature_c,
          station: res[i].fields.gc_obo_gare_origine_r_name,
          returnDate: res[i].fields.gc_obo_date_heure_restitution_c
        });
        await _.save();
      }
    });
  })

  .catch(err => {
    console.error(`Unable to connect to SQL database: ${err}`.red);
    process.exit(42);
  });
