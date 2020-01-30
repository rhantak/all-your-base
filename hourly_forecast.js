class HourlyForecast {
  constructor(hourly_data){
    this.summary = hourly_data.summary
    this.icon = hourly_data.icon
    this.data = this.data_by_hour(hourly_data.data.splice(0,8))
  }

  data_by_hour(hourly_data){
    return hourly_data.map(hour => {
      return {
        time: hour.time,
        summary: hour.summary,
        icon: hour.icon,
        precipIntensity: hour.precipIntensity,
        precipProbability: hour.precipProbability,
        temperature: hour.temperature,
        humidity: hour.humidity,
        pressure: hour.pressure,
        windSpeed: hour.windSpeed,
        windGust: hour.windGust,
        windBearing: hour.windBearing,
        cloudCover: hour.cloudCover,
        visibility: hour.visibility
      }
    })
  }
}

module.exports = HourlyForecast;
