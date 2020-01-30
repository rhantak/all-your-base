var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require("node-fetch");
const env = require('dotenv').config()
const bodyParser = require('body-parser');
const LocationForecast = require ('../../../location_forecast.js')


router.get('/', (request, response) => {
  database('users').where('api_key', request.body.api_key).select()
    .then(users => {
      if(users.length) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.location},co&key=${process.env.GOOGLE_KEY}`)
        .then(response => response.json())
        .then(result => result.results[0].geometry.location)
        .then(coordinate_data => `${coordinate_data.lat},${coordinate_data.lng}`)
        .then(coordinates => {
          fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${coordinates}`)
          .then(darksky_data => darksky_data.json())
          .then(location_forecast => new LocationForecast(location_forecast, request.query.location))
          .then(forecast_object => response.status(200).send(forecast_object))
        })
        .catch((error) => {
          response.status(500).json({ error });
        });
      } else {
        response.status(401).json({
          error: `Unauthorized request, API key is missing or incorrect.`
        })
      }
    })
});

module.exports = router;
