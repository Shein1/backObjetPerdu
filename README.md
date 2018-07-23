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
            "id": 19,
            "date": 1,
            "station": 4,
            "typeObject": 2,
            "natureObject": 2
        },
        {
            "id": 23,
            "date": 1,
            "station": 4,
            "typeObject": 2,
            "natureObject": 2
        },
        {
            "id": 28,
            "date": 1,
            "station": 4,
            "typeObject": 2,
            "natureObject": 2
        }
    ],
    "information": {
        "station": {
            "stationName": "Brest"
        },
        "type": null,
        "nature": {
            "natureObject": "Manteau, veste, blazer, parka, blouson, cape"
        },
        "date": null
    }
}
```

## Built With

- [Nodejs](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Heroku](https://www.heroku.com/)

## Author

- [Shein1](https://github.com/Shein1)

![alt text](https://i.gifer.com/4V0f.gif)
