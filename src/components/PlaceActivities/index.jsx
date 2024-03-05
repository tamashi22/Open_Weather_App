import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { EventsApi } from '../../services/EventApi'
import styles from './PlaceActivities.module.scss'
import Heart from 'icons/Heart.svg'
import Activity from 'images/activity.png'

export const PlaceActivities = ({ place }) => {
  const access_token = '2G66_3i79DimftLse7HZN09HbviecNwhB77g8N1Lyg4'
  const [images, setImages] = useState([])
  useEffect(() => {
    if (place !== 'landscape' && place) {
      const fetchImages = async () => {
        try {
          setImages([])
          const response = await axios.get(
            'https://api.unsplash.com/search/photos',
            {
              headers: {
                Authorization: `Client-ID ${access_token}`,
              },
              params: {
                query: place,
                per_page: 4,
              },
            },
          )
          setImages(response.data.results)
        } catch (error) {
          console.error(error)
        }
      }

      fetchImages()
    }
  }, [place])
  console.log(images)
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
