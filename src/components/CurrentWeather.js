// src/components/CurrentWeather.js
import React from 'react'

const CurrentWeather = ({data}) => {
  if (!data) {
    return null // or return a placeholder/loading state
  }

  return (
    <div className="weather-card">
      <h2>Current Weather in {data.name}</h2>
      <p>Temperature: {data.main.temp} K</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
      <p>Condition: {data.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        alt="weather icon"
      />
    </div>
  )
}

export default CurrentWeather
