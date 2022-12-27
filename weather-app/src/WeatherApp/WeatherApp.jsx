import React from "react";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import ExtraInfo from "../ExtraInfo/ExtraInfo";
import TempInfo from "../TempInfo/TempInfo";
import WeatherTaps from "../WeatherTaps/WeatherTaps";

const WeatherApp = () => {
  return (
    <div id="container">
      <CurrentWeather />
      <TempInfo />
      <ExtraInfo />
      <WeatherTaps />
    </div>
  );
};

export default WeatherApp;
