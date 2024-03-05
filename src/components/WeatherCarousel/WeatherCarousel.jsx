import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller } from 'swiper/modules'
import clsx from 'clsx'
import dayjs from 'dayjs'
import Cloud from 'icons/cloud.svg'
import Arrow from 'icons/Arrow.svg'
import styles from './WeatherCarousel.module.scss'
export const WeatherCarousel = ({ weather }) => {
  console.log('dayly', weather)
  const [swiper, setSwiper] = React.useState()
  const [isAtStart, setIsAtStart] = React.useState(true)
  const [isAtEnd, setIsAtEnd] = React.useState(false)
  React.useEffect(() => {
    if (swiper) {
      swiper.on('reachBeginning', () => setIsAtStart(true))
      swiper.on('reachEnd', () => setIsAtEnd(true))
      swiper.on('fromEdge', () => {
        setIsAtStart(false)
        setIsAtEnd(false)
      })
    }
  }, [swiper])
  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Controller]}
        className={styles.swiper}
        onSwiper={setSwiper}
        slidesPerView="auto"
        spaceBetween={10}
      >
        {weather &&
          weather.map((item, index) => (
            <SwiperSlide className={styles.swiperSlide} key={index}>
              <div className={styles.item}>
                <p className={styles.date}>
                  {dayjs.unix(item.dt).format('ddd')}
                </p>
                <p className={styles.forecast}>{item.weather[0].main}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="weather"
                  className={styles.icon}
                />

                <p className={styles.temp}>{item.temp.day}°C</p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      {!isAtEnd && (
        <button
          className={clsx(styles.arrowButton, styles.next)}
          onClick={() => swiper?.slideNext()}
        >
          <img src={Arrow} alt="arr" />
        </button>
      )}
      {!isAtStart && (
        <button
          className={clsx(styles.arrowButton, styles.prev)}
          onClick={() => swiper?.slidePrev()}
        >
          <img src={Arrow} alt="arr" />
        </button>
      )}
    </div>
  )
}
