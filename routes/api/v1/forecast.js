var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require("node-fetch");
const env = require('dotenv').config()


router.get('/', (request, response) => {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.location},co&key=${process.env.GOOGLE_KEY}`)
    .then((response) => response.json())
    .then(result => {
      response.status(200).json(result.results[0].geometry.location);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

module.exports = router;
