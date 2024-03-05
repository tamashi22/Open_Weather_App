import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import dayjs from 'dayjs'
import { WeatherApi } from '../../services/WeatherApi'
import styles from './HourlyForecast.module.scss'
import Clock from 'icons/Clock.svg'

function HourlyForecast({ coords }) {
  const [weatherData, setWeatherData] = useState({})
  const [chartData, setChartData] = useState({})

  useEffect(() => {
    if (coords) {
      WeatherApi.getHourlyForecast(coords.lat, coords.lon)
        .then(response => {
          setWeatherData(response.data)
        })
        .catch(error => {
          console.error('Error fetching weather data: ', error)
        })
    }
  }, [coords])

  useEffect(() => {
    if (weatherData.list) {
      const temps = weatherData.list.slice(0, 24).map(item => item.main.temp)
      const labels = weatherData.list
        .slice(0, 24)
        .map(item => dayjs.unix(item.dt).format('h A'))

      setChartData({
        scaleFontColor: 'white',
        labels: labels,
        datasets: [
          {
            label: 'Temperature',
            data: temps,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#FFC355',
          },
        ],
      })
    }
  }, [weatherData])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={Clock} alt="Clock" />
        <span>24-hour forecast</span>
      </div>
      <div className={styles.chart}>
        {chartData.labels && (
          <Line data={chartData} options={{ responsive: true }} />
        )}
      </div>
    </div>
  )
}

export default HourlyForecast
