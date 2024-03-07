import React, { useState } from 'react'
import dayjs from 'dayjs'
import useMediaQuery from './helpers/useMediaQuery'
import { TextField } from './components/ui/TextField'
import { HourlyForecast } from './components/HourlyForecast'
import { NavBar } from './components/NavBar'
import { WeatherCarousel } from './components/WeatherCarousel'
import { PlaceActivities } from './components/PlaceActivities'
import { ForecastDetails } from './components/ForecastDetails'
import { WeatherApi } from './services/WeatherApi'
import { EventsApi } from './services/EventApi'

import styles from './App.module.scss'
function App() {
  const [inputValue, setInputValue] = useState('')
  const [place, setPlace] = useState('landscape')
  const [weatherData, setWeatherData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchHistory, setSearchHistory] = useState([])
  const [searchHistoryVisible, setSearchHistoryVisible] = useState(false)
  const [daylyData, setDailyData] = useState({})
  const [background, SetBackground] = useState({})
  const isTablet = useMediaQuery('(max-width: 1100px)')
  const isMobile = useMediaQuery('(max-width: 850px)')

  const handleButtonClick = event => {
    event.preventDefault()
    const newPlace = inputValue
    setPlace(newPlace)
    if (newPlace) {
      setWeatherData({})
      WeatherApi.getCurrentWeather(newPlace)
        .then(response => {
          setWeatherData(response.data)
          setLoading(false)
          setError('')

          // Check if newPlace already exists in search history
          if (!searchHistory.includes(newPlace)) {
            // Add newPlace to search history and save it in localStorage
            const newHistory = [newPlace, ...searchHistory].slice(0, 5)
            setSearchHistory(newHistory)
            localStorage.setItem('searchHistory', JSON.stringify(newHistory))
          }
        })
        .catch(error => {
          console.error('Error fetching weather data: ', error)
          setError("Sorry, we couldn't find data for this location.")
          setLoading(false)
        })
    }
  }
  React.useEffect(() => {
    const loadedHistory = localStorage.getItem('searchHistory')
    if (loadedHistory) {
      setSearchHistory(JSON.parse(loadedHistory))
    }
  }, [])
  React.useEffect(() => {
    if (weatherData?.coord) {
      WeatherApi.getDailyForecast(
        weatherData?.coord.lat,
        weatherData?.coord.lon,
      )
        .then(response => {
          setDailyData({})
          setDailyData(response.data)
        })
        .catch(error => {
          console.error('Error fetching weather data: ', error)
        })
    }
  }, [weatherData])
  React.useEffect(() => {
    EventsApi.getEvents(place, 2)
      .then(response => {
        SetBackground({})
        SetBackground(response.data.results)
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }, [place])

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage: `url(${background[1]?.urls?.full})`,
      }}
    >
      <div className={styles.container}>
        <div>
          <form onSubmit={handleButtonClick} className={styles.form}>
            <div className={styles.seach}>
              <TextField
                placeholder="Enter any city"
                className={styles.input}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onFocus={() => setSearchHistoryVisible(true)}
                onBlur={() =>
                  setTimeout(() => setSearchHistoryVisible(false), 200)
                }
              />
              {searchHistoryVisible && (
                <div className={styles.searchHistory}>
                  {searchHistory.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setInputValue(item)}
                      className={styles.searchItem}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" className={styles.button}>
              Seach Weather
            </button>
          </form>
          {loading && <p className={styles.loading}>Loading...</p>}
          {error && <p>{error}</p>}
          <h2 className={styles.weather}>
            {weatherData.weather && weatherData.weather[0].main}
          </h2>
          {isMobile && (
            <div>
              {weatherData.weather && (
                <img
                  className={styles.image}
                  src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                  alt="icon"
                />
              )}
            </div>
          )}
          <div className={styles.details}>
            <h3 className={styles.temp}>
              {weatherData.main && weatherData.main.temp}°C
            </h3>
            <span className={styles.date}>
              {weatherData &&
                dayjs.unix(weatherData.dt).format('dddd | DD MMM YYYY')}
            </span>
          </div>
        </div>
        {!isMobile && (
          <div>
            {weatherData.weather && (
              <img
                className={styles.image}
                src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                alt="icon"
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.detailsContainer}>
        {!isTablet && <NavBar />}
        <div className={styles.PlaceDetails}>
          {isMobile && (
            <div className={styles}>
              <WeatherCarousel weather={daylyData?.list} />
            </div>
          )}
          {!isMobile && <PlaceActivities place={place} />}
          <HourlyForecast coords={weatherData && weatherData.coord} />
        </div>
        {!isTablet && (
          <ForecastDetails
            coords={weatherData && weatherData.coord}
            weather={weatherData}
          />
        )}
      </div>
    </div>
  )
}

export default App
