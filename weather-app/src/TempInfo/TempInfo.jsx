import React, { useContext } from "react";
import { WeatherContext } from "../WeatherProvider/WeatherProvider";

const TempInfo = () => {
  const { feels_like, temp_min, temp_max } = useContext(WeatherContext);
  return (
    <div id="tempInfoContainer">
      <span>{`체감온도 ${feels_like}`}&deg;</span>
      <span>{`최저기온 ${temp_min}`}&deg;</span>
      <span>{`최고기온 ${temp_max}`}&deg;</span>
    </div>
  );
};

export default TempInfo;
