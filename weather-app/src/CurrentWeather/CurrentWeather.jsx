import React, { useContext } from "react";
import CurrentWeatherIcon from "../CurrentWeatherIcon/CurrentWeatherIcon";
import { WeatherContext } from "../WeatherProvider/WeatherProvider";

const CurrentWeather = () => {
  const { name, weatherState, temp } = useContext(WeatherContext);
  return (
    <div id="currentWeatherContainer">
      {`${name} /`}
      <CurrentWeatherIcon weatherState={weatherState} />
      <span>{temp}&deg;</span>
    </div>
  );
};

export default CurrentWeather;
