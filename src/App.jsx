import { useState } from "react";
import styles from "./App.module.scss";
import { TextField } from "./components/ui/TextField";
import { HourlyForecast } from "./components/HourlyForecast";
import { NavBar } from "./components/NavBar";
import { PlaceActivities } from "./components/PlaceActivities";
import { ForecastDetails } from "./components/ForecastDetails";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [place, setPlace] = useState("landscape");

  const handleButtonClick = (event) => {
    event.preventDefault();
    setPlace(inputValue.replaceAll(" ", "-"));
  };
  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage: `url(https://source.unsplash.com/1600x900/?${place})`,
      }}
    >
      <div className={styles.container}>
        <div>
          <form onSubmit={handleButtonClick} className={styles.form}>
            <TextField
              placeholder="Enter any city"
              className={styles.input}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className={styles.button}>
              Seach Weather
            </button>
          </form>
          <h2 className={styles.weather}>Cloudy</h2>
          <div className={styles.details}>
            <h3 className={styles.temp}>26°C</h3>
            <span className={styles.date}>Sunday | 12 Dec 2023 </span>
          </div>
        </div>
        <div className={styles.image}>авы</div>
      </div>
      <div className={styles.detailsContainer}>
        <NavBar />
        <div className={styles.PlaceDetails}>
          <PlaceActivities />
          <HourlyForecast />
        </div>
        <ForecastDetails />
      </div>
    </div>
  );
}

export default App;
