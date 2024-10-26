// src/getData/api.js

const GEOCODING_API = 'https://api.openweathermap.org/geo/1.0'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY

export const fetchCityCoordinates = async city => {
  try {
    const response = await fetch(
      `${GEOCODING_API}/direct?q=${city}&limit=1&appid=${API_KEY}`,
    )
    if (!response.ok) {
      return {success: false, message: 'Failed to fetch city coordinates'}
    }
    const data = await response.json()

    if (data.length === 0) {
      return {success: false, message: 'City not found'}
    }
    return {success: true, data: {lat: data[0].lat, lon: data[0].lon}}
  } catch (error) {
    console.error('Error fetching city coordinates:', error)
    return {success: false, message: 'Error fetching city coordinates'}
  }
}

export const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    )
    if (!response.ok) {
      return {success: false, message: 'Failed to fetch weather data'}
    }
    const data = await response.json()
    return {success: true, data}
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return {success: false, message: 'Error fetching weather data'}
  }
}

export const fetchForecastData = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    )
    if (!response.ok) {
      return {success: false, message: 'Failed to fetch forecast data'}
    }
    const data = await response.json()
    return {success: true, data}
  } catch (error) {
    console.error('Error fetching forecast data:', error)
    return {success: false, message: 'Error fetching forecast data'}
  }
}
