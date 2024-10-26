// src/App.js
import React, {useState} from 'react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import './App.css'
import {
  fetchCityCoordinates,
  fetchWeatherData,
  fetchForecastData,
} from './getData/api'

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [coordinatesError, setCoordinatesError] = useState('')
  const [weatherError, setWeatherError] = useState('')
  const [forecastError, setForecastError] = useState('')
  const [loading, setLoading] = useState(false) // New loading state

  const handleForecast = list => {
    const dailyData = {}

    list.forEach(entry => {
      // Extract the date from dt_txt
      const dateString = entry.dt_txt.split(' ')[0] // Get the YYYY-MM-DD part

      // Initialize daily data if it doesn't exist
      if (!dailyData[dateString]) {
        dailyData[dateString] = {
          maxTemp: entry.main.temp_max,
          minTemp: entry.main.temp_min,
          weatherConditions: {},
        }
      } else {
        // Update max and min temperatures
        dailyData[dateString].maxTemp = Math.max(
          dailyData[dateString].maxTemp,
          entry.main.temp_max,
        )
        dailyData[dateString].minTemp = Math.min(
          dailyData[dateString].minTemp,
          entry.main.temp_min,
        )
      }

      // Count occurrences of weather conditions
      const condition = entry.weather[0].description
      const {icon} = entry.weather[0]

      if (!dailyData[dateString].weatherConditions[condition]) {
        dailyData[dateString].weatherConditions[condition] = {
          count: 1,
          icon,
        }
      } else {
        dailyData[dateString].weatherConditions[condition].count += 1
      }
    })

    console.log(dailyData)

    // Convert dailyData object to an array of the desired format
    return Object.entries(dailyData).map(([date, data]) => {
      // Determine the most frequent weather condition
      const mostFrequentCondition = Object.entries(
        data.weatherConditions,
      ).reduce((prev, curr) => (prev[1].count > curr[1].count ? prev : curr))

      return {
        date,
        maxTemp: data.maxTemp,
        minTemp: data.minTemp,
        weatherCondition: mostFrequentCondition[0], // Get the condition name
        weatherIcon: mostFrequentCondition[1].icon, // Get the associated icon
      }
    })
  }

  const handleSearch = async city => {
    setCoordinatesError('')
    setWeatherError('')
    setForecastError('')
    setCurrentWeather(null)
    setForecast([])
    setLoading(true) // Set loading to true when fetching starts

    const coordinates = await fetchCityCoordinates(city)
    setLoading(false) // Set loading to false after fetching coordinates

    if (!coordinates.success) {
      setCoordinatesError(coordinates.message)
      return
    }

    const {lat, lon} = coordinates.data
    setLoading(true) // Set loading to true when fetching weather data

    const weatherResponse = await fetchWeatherData(lat, lon)
    const forecastResponse = await fetchForecastData(lat, lon)
    setLoading(false) // Set loading to false after fetching weather and forecast data

    if (!weatherResponse.success) {
      setWeatherError(weatherResponse.message)
    } else {
      setCurrentWeather(weatherResponse.data)
    }

    if (!forecastResponse.success) {
      setForecastError(forecastResponse.message)
    } else {
      const updatedForecastList = handleForecast(forecastResponse.data.list)
      console.log(updatedForecastList)
      setForecast(updatedForecastList)
    }
  }

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="loading">Loading...</p>} {/* Loading message */}
      {coordinatesError && <p className="error">{coordinatesError}</p>}
      {weatherError && <p className="error">{weatherError}</p>}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastError && <p className="error">{forecastError}</p>}
      {forecast.length > 0 && <Forecast data={forecast} />}
    </div>
  )
}

export default App
