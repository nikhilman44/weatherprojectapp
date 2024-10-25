import React from 'react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import './style.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      weatherData: null,
      forecastData: null,
      error: null,
      loading: false,
    }
  }

  fetchWeatherData = async city => {
    console.log('Fetching data for:', city)
    this.setState({
      loading: true,
      error: null,
      weatherData: null,
      forecastData: null,
    })

    try {
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
      console.log('Using API Key:', apiKey)

      // Fetching geo coordinates
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`,
      )
      const geoData = await geoResponse.json()
      console.log('Geo Data:', geoData)

      if (!geoData || geoData.length === 0) {
        this.setState({loading: false, error: 'City not found'})
        return
      }

      const {lat, lon} = geoData[0]
      console.log('Coordinates:', lat, lon)

      // Fetching current weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      )
      const weatherData = await weatherResponse.json()
      console.log('Weather Data:', weatherData)

      // Fetching forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}`,
      )
      const forecastData = await forecastResponse.json()
      console.log('Forecast Data:', forecastData)

      this.setState({weatherData, forecastData, loading: false})
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({loading: false, error: 'Error fetching data'})
    }
  }

  handleSearch = city => {
    this.setState({city})
    this.fetchWeatherData(city)
  }

  render() {
    const {weatherData, forecastData, error, loading} = this.state

    return (
      <div className="container">
        <h1>Weather Dashboard</h1>
        <SearchBar onSearch={this.handleSearch} />
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && weatherData && (
          <CurrentWeather weatherData={weatherData} />
        )}
        {!loading && !error && forecastData && (
          <Forecast forecastData={forecastData} />
        )}
      </div>
    )
  }
}

export default App
