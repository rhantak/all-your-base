var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require("node-fetch");
const env = require('dotenv').config()
const CurrentForecast = require('../../../current_forecast')

async function fetchCoordinates(location) {
  let coordinates = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location},co&key=${process.env.GOOGLE_KEY}`)
    .then(response => response.json())
    .then(result => result.results[0].geometry.location)
    .then(coordinate_data => `${coordinate_data.lat},${coordinate_data.lng}`)
  return coordinates;
}

async function fetchWeather(location) {
  let coordinate_data = await fetchCoordinates(location)
  let weather_data = await fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${coordinate_data}`)
    .then(darksky_data => darksky_data.json())
  return weather_data;
}

async function favoritesWeather(locations) {
  return Promise.all(locations.map(async (location) => {
    let currentWeatherData = await fetchWeather(location)
    return {
      name: location,
      currentWeather: new CurrentForecast(currentWeatherData.currently)
    }
  }))
}

router.get('/', (request, response) => {
  database('users').where('api_key', request.body.api_key).select()
    .then(users => {
      if (users.length) {
        database('favorites').where('user_id', users[0].id).select('location')
          .then(locations => favoritesWeather(locations))
          .then(data => response.status(200).send(data))
      } else {
        response.status(401).json({
          error: "Unauthorized request, API key is missing or incorrect."
        })
      }
    })
})

router.post('/', (request, response) => {
  database('users').where('api_key', request.body.api_key).select()
    .then(users => {
      if(users.length) {
        let location = request.body.location
        let user_id = users[0].id

        database('favorites').insert({
          location: location, user_id: user_id
        })
          .then(response.status(200).send({"message": `${location} has been added to your favorites.`}))
      } else {
        response.status(401).json({
          error: "Unauthorized request, API key is missing or incorrect."
        })
      }
    })
});

router.delete('/', (request, response) => {
  database('users').where('api_key', request.body.api_key).select()
    .then(users => {
      if(users.length) {
        let location = request.body.location;
        let user_id = users[0].id;

        database('favorites').where('location', location).delete()
          .then(response.status(204).send())
      } else {
        response.status(401).json({
          error: "Unauthorized request, API key is missing or incorrect."
        })
      }
    })
});

module.exports = router;
