class CurrentForecast {
  constructor(current_data) {
    this.summary = current_data.summary
    this.icon = current_data.icon
    this.precipIntensity = current_data.precipIntensity
    this.precipProbability = current_data.precipProbability
    this.temperature = current_data.temperature
    this.humidity = current_data.humidity
    this.pressure = current_data.pressure
    this.windSpeed = current_data.windSpeed
    this.windGust = current_data.windGust
    this.windBearing = current_data.windBearing
    this.cloudCover = current_data.cloudCover
    this.visibility = current_data.visibility
  }
}

module.exports = CurrentForecast;
