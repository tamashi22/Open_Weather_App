import React from "react";
import styles from "./NavBar.module.scss";
import Profile from "images/profile.png";
import Weather from "icons/wt.svg";
import Explore from "icons/Explore.svg";
import Location from "icons/Location.svg";
import Settings from "icons/Settings.svg";
function NavBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <img src={Profile} />
      </div>
      <ui className={styles.parameters}>
        <li>
          <a href="#">
            <img src={Weather} alt="wt" />
            <p>weather</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={Explore} alt="wt" />
            <p>explore</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={Location} alt="wt" />
            <p>cities</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img src={Settings} alt="wt" />
            <p>settings</p>
          </a>
        </li>
      </ui>
    </div>
  );
}

export default NavBar;
