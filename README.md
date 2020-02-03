# Express Sweater Weather

## Introduction
Express Sweater Weather is a basic CRUD API for weather data in cities. Users can search for weather at a certain location, as well as add/remove favorited locations and see a list of current weather in all of their favorite locations.

## Initial Setup
This application is hosted on Heroku [here](https://sheltered-dusk-71552.herokuapp.com/).

For local setup, please use NPM to manage dependencies. After cloning down the repository, run the command `npm install`. After this is complete, you will need to set up a development database using PostegreSQL, which can be done with the following commands:
```
psql
CREATE DATABASE express_sweater_weather_dev;
```
After the database is created, run `knex migrate:latest` to set up the necessary tables and `knex seed:run` to create a default user using seeds.

## How To Use
All request URLs will begin with `https://sheltered-dusk-71552.herokuapp.com/api/v1`. Users must have a key to use this API, which must be sent in the body of all requests.

#### GET `/forecast?location=<location>`
This endpoint will send a list of weather information for the given city. Data includes current weather, hourly weather for the next 8 hours, and daily weather for the next 7 days.

Example request:
```
GET https://sheltered-dusk-71552.herokuapp.com/api/v1/forecast?location=denver,co
```
Body:
```
{
  "api_key": "examplekey
}
```

#### POST `/favorites`
This endpoint will add a location to the user's favorites. The body of the request will require a parameter of `"location"` in addition to the user's api key. Successful requests will send a message: `"<location> has been added to your favorites."`. Locations may only be favorited one time per user.

Example request:
```
POST https://sheltered-dusk-71552.herokuapp.com/api/v1/favorites
```
Body:
```
{
  "api_key": "examplekey,
  "location": "denver,co"
}
```

#### DELETE `/favorites`
This endpoint will remove a location from a user's favorites. The body of the request will require a parameter of `"location"` in addition to the user's api key. Successful requests will send a response with a status of 204.

Example request:
```
DELETE https://sheltered-dusk-71552.herokuapp.com/api/v1/favorites
```
Body:
```
{
  "api_key": "examplekey,
  "location": "denver,co"
}
```

#### GET `/favorites`
This endpoint will send a list of the user's favorites, along with their current weather data.

Example request:
```
GET https://sheltered-dusk-71552.herokuapp.com/api/v1/favorites
```
Body:
```
{
  "api_key": "examplekey
}
```

## Schema Design

<img width="444" alt="Screen Shot 2020-02-03 at 8 06 20 AM" src="https://user-images.githubusercontent.com/47759923/73664716-1bc4b300-465d-11ea-9b78-40766bbe65b5.png">

## Tech Stack

This application is built in Node.js using Express as a framework and Knex as an ORM. PostegreSQL is used for the database, and the finished app is deployed through Heroku.

## Core Contributors

This application was developed as a solo project by [myself](https://github.com/rhantak), with input from [John Travers](https://github.com/johnktravers) in the form of PR review.

You can find my agile board on GitHub Projects [here](https://github.com/rhantak/express-sweater-weather/projects/1).
