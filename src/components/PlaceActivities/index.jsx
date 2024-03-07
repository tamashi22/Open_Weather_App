import React, { useEffect, useState } from 'react'
import { EventsApi } from '../../services/EventApi'
import Heart from 'icons/Heart.svg'
import styles from './PlaceActivities.module.scss'
export const PlaceActivities = ({ place }) => {
  const [images, setImages] = useState([])
  useEffect(() => {
    if (place !== 'landscape' && place) {
      setImages([])
      EventsApi.getEvents(place, 4)
        .then(response => {
          setImages(response.data.results)
        })
        .catch(error => {
          console.error('Error fetching data: ', error)
        })
    }
  }, [place])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={Heart} alt="heart" />
        <h3>Activities in your area</h3>
      </div>

      <div className={styles.activities}>
        {images &&
          images.map((item, index) => (
            <div className={styles.activityItem} key={index}>
              <img
                src={item.urls.full}
                alt="activity"
                className={styles.image}
              />
              <p className={styles.description}>{item.alt_description}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
