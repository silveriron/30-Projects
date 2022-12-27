import React from "react";
import {
  WiDaySunny,
  WiDayHaze,
  WiDayThunderstorm,
  WiRain,
  WiDayShowers,
  WiCloudy,
} from "react-icons/wi";

const CurrentWeatherIcon = ({ weatherState, ...props }) => {
  switch (weatherState) {
    case "Clear":
      return <WiDaySunny {...props} />;
    case "Thunderstorm":
      return <WiDayThunderstorm {...props} />;
    case "Drizzle":
      return <WiRain {...props} />;
    case "Rain":
      return <WiRain {...props} />;
    case "Snow":
      return <WiDayShowers {...props} />;
    case "Clouds":
      return <WiCloudy {...props} />;
    default:
      return <WiDayHaze {...props} />;
  }
};

export default CurrentWeatherIcon;
