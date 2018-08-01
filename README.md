# Welcome to Lost Object

Javascript api created with the open data of SNCF. This api aims to help people find their lost object in station around the country ( it only works on France with SNCF for the moment )

### Installing

It's pretty simple to install and test this api

Clone the repo

```
git clone https://github.com/Shein1/backObjetPerdu.git
```

Install all packages

```
npm install
```

Then run the seeder

```
npm run seed_object
```

Now let's run our server and use the api

```
npm start
```

Here some data you can get with this api :

```
{
    "found_object": [
        {
            "id": 789,
            "date": 4,
            "station": 6,
            "typeObject": 4,
            "natureObject": 5
        }
    ],
    "information": {
        "station": {
            "stationName": "La Rochelle"
        },
        "type": {
            "typeObject": "Optique"
        },
        "nature": {
            "natureObject": "Lunettes en étui"
        },
        "date": {
            "date": "2018-07-23"
        },
        "page": 1,
        "objects": 1
    }
}
```

## Built With

- [Nodejs](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Heroku](https://www.heroku.com/)

## Changelog

- Version 1.7

  - Change on seeder
  - Change on model Object

- Version 1.6

  - Change on route /user
  - Fix of spelling error on route /found_object
  - Update of readme

- Version 1.5

  - Changes on res.json on route /found_object

- Version 1.4

  - Change on routes

- Version 1.3

  - Change on Readme

- Version 1.2

  - Changes on /found_object route

- Version 1.1

  - Changes on routes

- Version 1

  - Update of model / routes & seeder

- Version 0.9

  - Update of Readme

- Version 0.8

  - Change on routes and seeder

- Version 0.7

  - Test on seeder & fix

- Version 0.6

  - Change on models / routes / seeders
  - Add of model Date

- Version 0.5

  - Add of User route, models and packages
  - Changes on seeders/routes/models

- Version 0.4

  - Changes on routes / server

- Version 0.3

  - Starting routes
  - Changes of name on models/seeders

- Version 0.2 / 0.1
  - Creation of models and add of packages

## Author

- [Shein1](https://github.com/Shein1)

![alt text](https://i.gifer.com/4V0f.gif)
