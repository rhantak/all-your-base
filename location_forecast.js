const CurrentForecast = require('./current_forecast')
const HourlyForecast = require('./hourly_forecast')

class LocationForecast {
  constructor(forecast_data, location){
    this.location = location
    this.currently = new CurrentForecast(forecast_data.currently)
    this.hourly = new HourlyForecast(forecast_data.hourly)
  }
}

module.exports = LocationForecast;
