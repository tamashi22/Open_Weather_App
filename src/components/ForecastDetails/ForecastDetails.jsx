import React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { WeatherCarousel } from '../WeatherCarousel'
import { WeatherApi } from '../../services/WeatherApi'
import Temp from 'icons/temp.svg'
import Wind from 'icons/wind.svg'
import Rain from 'icons/rain.svg'
import Sun from 'icons/Sun.svg'
import styles from './ForecastDetails.module.scss'
export const ForecastDetails = props => {
  const [weatherData, setWeatherData] = React.useState({})
  dayjs.extend(utc)
  const currentTime = dayjs().format('h:mmA [GMT]')
  React.useEffect(() => {
    if (props?.coords) {
      WeatherApi.getDailyForecast(props?.coords.lat, props?.coords.lon)
        .then(response => {
          setWeatherData({})
          setWeatherData(response.data)
        })
        .catch(error => {
          console.error('Error fetching weather data: ', error)
        })
    }
  }, [props])

  return (
    <div className={styles.wrapper}>
      <WeatherCarousel weather={weatherData?.list} />

      <div className={styles.time}>{currentTime}</div>
      <h2 className={styles.title}>AIR CONDITIONS</h2>
      <div className={styles.weacherDeatails}>
        <div className={styles.detail}>
          <img src={Temp} alt="ico" />
          <div>
            <h4 className={styles.detailTitle}>Real Feel</h4>
            <p className={styles.index}>{props?.weather.main?.feels_like}</p>
          </div>
        </div>
        <div className={styles.detail}>
          <img src={Wind} alt="ico" />
          <div>
            <h4 className={styles.detailTitle}>Wind</h4>
            <p className={styles.index}>
              {`${props?.weather?.wind?.speed ?? ' N/A'} km/hr`}
            </p>
          </div>
        </div>
        <div className={styles.detail}>
          <img src={Rain} alt="ico" />
          <div>
            <h4 className={styles.detailTitle}>Chance of rain</h4>
            <p className={styles.index}>
              {weatherData && weatherData?.list?.[0]?.pop} %
            </p>
          </div>
        </div>
        <div className={styles.detail}>
          <img src={Sun} alt="ico" />
          <div>
            <h4 className={styles.detailTitle}>UV Index</h4>
            <p className={styles.index}>4</p>
          </div>
        </div>
      </div>
    </div>
  )
}
