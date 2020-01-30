var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require("node-fetch");


router.get('/', (request, response) => {
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=denver,co&key=AIzaSyA9oPZa8kXUwBEuFRo5-uKUaxDMJhfbBXw')
    .then((response) => response.json())
    .then(result => {
      response.status(200).json(result.results[0].geometry.location);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

module.exports = router;
