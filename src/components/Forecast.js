// src/components/Forecast.js
import React from 'react'

function Forecast({data}) {
  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-cards">
        {data.map(item => (
          <div className="forecast-card">
            <p>{new Date(item.date).toLocaleDateString()}</p>
            <p>High: {item.maxTemp} °C</p>
            <p>Low: {item.minTemp} °C</p>
            <p>{item.weatherConditions}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weatherIcon}.png`}
              alt="weather icon"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
