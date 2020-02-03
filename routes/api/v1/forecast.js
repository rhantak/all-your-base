var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require("node-fetch");
const env = require('dotenv').config()
const bodyParser = require('body-parser');
const LocationForecast = require ('../../../location_forecast.js')

async function fetchCoordinates(location) {
  let coordinates = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_KEY}`)
    .then(response => response.json())
    .then(result => result.results[0].geometry.location)
    .then(coordinate_data => `${coordinate_data.lat},${coordinate_data.lng}`)
    .catch((error) => {
      response.status(500).json({ error: error})
    })
  return coordinates;
}

async function fetchWeather(location) {
  let coordinate_data = await fetchCoordinates(location)
  let weather_data = await fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${coordinate_data}`)
    .then(darksky_data => darksky_data.json())
    .catch((error) => {
      response.status(500).json({ error: error })
    })
  return weather_data;
}

router.get('/', (request, response) => {
  database('users').where('api_key', request.body.api_key).select()
    .then(users => {
      if(users.length) {
        fetchWeather(request.query.location)
          .then(location_forecast => new LocationForecast(location_forecast, request.query.location))
          .then(forecast_object => response.status(200).send(forecast_object))
      } else {
        response.status(401).json({
          error: `Unauthorized request, API key is missing or incorrect.`
        })
      }
    })
    .catch((error) => {
      response.status(500).json({ error: error });
    })
});

module.exports = router;
