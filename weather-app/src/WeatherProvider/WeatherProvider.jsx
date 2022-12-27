import React, { createContext, useEffect, useState } from "react";

export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weatherInfo, setWeatherInfo] = useState();

  const getWeatherInfo = async () => {
    try {
      const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY}&q=seoul&units=metric`;

      const weatherRes = await fetch(weatherAPI);
      const {
        name,
        coord: { lat, lon },
        main: { temp, humidity, pressure, feels_like, temp_min, temp_max },
        sys: { sunset, sunrise },
        weather: [{ main: weatherState }],
        wind: { speed, deg },
      } = await weatherRes.json();

      const hourlyWeatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

      const hourlyRes = await fetch(hourlyWeatherAPI);
      const { list: hourly } = await hourlyRes.json();
      setWeatherInfo({
        name,
        temp,
        humidity,
        pressure,
        feels_like,
        temp_max,
        temp_min,
        sunset,
        sunrise,
        weatherState,
        speed,
        deg,
        hourly,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <WeatherContext.Provider value={{ ...weatherInfo }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
