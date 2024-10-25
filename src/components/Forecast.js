import React from 'react'

const Forecast = ({forecastData}) => {
  if (!forecastData) return null

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      {forecastData.list.map((day, index) => (
        <div key={day.dt} className="forecast-card">
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
          <p>High: {Math.round(day.main.temp_max - 273.15)}°C</p>
          <p>Low: {Math.round(day.main.temp_min - 273.15)}°C</p>
          <p>{day.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
          />
        </div>
      ))}
    </div>
  )
}

export default Forecast
