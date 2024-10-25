import React from 'react'

const CurrentWeather = ({weatherData}) => {
  if (!weatherData) return null

  return (
    <div className="current-weather">
      <h2>Current Weather in {weatherData.name}</h2>
      <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <p>{weatherData.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
      />
    </div>
  )
}

export default CurrentWeather
