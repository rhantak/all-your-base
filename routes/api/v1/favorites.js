var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require("node-fetch");
const env = require('dotenv').config()

router.post('/', (request, response) => {
  database('users').where('api_key', request.body.api_key).select()
    .then(users => {
      if(users.length) {
        let location = request.body.location
        let user_id = users[0].id

        database('favorites').insert({
          location: location, user_id: user_id
        })
          .then(response.status(200).json({"message": `${location} has been added to your favorites.`}))
      } else {
        response.status(401).json({
          error: "Unauthorized request, API key is missing or incorrect."
        })
      }
    })
});

module.exports = router;
