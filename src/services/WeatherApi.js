import axios from 'axios'
const apiKey = '6a9c7f196e46f32106391ca6a9690ef7'
const baseUrl = 'https://api.openweathermap.org/data/2.5/'
export const WeatherApi = {
  getCurrentWeather(place) {
    const url = `${baseUrl}/weather?q=${place}&units=metric&appid=${apiKey}`

    return axios.get(url)
  },
  getDailyForecast(lat, lon) {
    const url = `${baseUrl}forecast/daily?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

    return axios.get(url)
  },
  getHourlyForecast(lat, lon) {
    const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

    return axios.get(url)
  },
}
