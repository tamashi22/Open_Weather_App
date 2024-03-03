import React from "react";
import styles from "./PlaceActivities.module.scss";
import Heart from "icons/Heart.svg";
import Activity from "images/activity.png";
export const PlaceActivities = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <img src={Heart} alt="heart" />
        <h3>Activities in your area</h3>
      </div>
      <div className={styles.activities}>
        <div className={styles.activityItem}>
          <img src={Activity} alt="activity" className={styles.image} />
          <p className={styles.description}>2km away</p>
        </div>
        <div className={styles.activityItem}>
          <img src={Activity} alt="activity" className={styles.image} />
          <p className={styles.description}>2km away</p>
        </div>
        <div className={styles.activityItem}>
          <img src={Activity} alt="activity" className={styles.image} />
          <p className={styles.description}>2km away</p>
        </div>
        <div className={styles.activityItem}>
          <img src={Activity} alt="activity" className={styles.image} />
          <p className={styles.description}>2km away</p>
        </div>
      </div>
    </div>
  );
};
