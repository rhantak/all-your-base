const CurrentForecast = require('./current_forecast')

class LocationForecast {
  constructor(forecast_data, location){
    this.location = location
    this.currently = new CurrentForecast(forecast_data.currently)
  }
}

module.exports = LocationForecast;
