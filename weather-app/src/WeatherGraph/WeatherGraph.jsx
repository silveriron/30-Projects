import React, { useContext } from "react";
import { LabelList, Line, LineChart, XAxis } from "recharts";
import CurrentWeatherIcon from "../CurrentWeatherIcon/CurrentWeatherIcon";
import { WeatherContext } from "../WeatherProvider/WeatherProvider";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export const formatXAxis = (data) => `${new Date(data * 1000).getHours()}시`;

const CustomizedDot = ({ payload, cx, cy }) => (
  <CurrentWeatherIcon
    weatherState={payload.weather}
    x={cx - 13}
    y={cy - 5}
    fontSize={30}
  />
);

const CustomizedLabel = ({ x, y, value }) => (
  <text x={x} y={y} dy={-4} fontSize={15} textAnchor="middle">
    {value}&deg;
  </text>
);

const LineGraph = ({ num }) => {
  const { hourly } = useContext(WeatherContext);

  return (
    <LineChart
      width={960}
      height={200}
      data={hourly
        ?.slice(num * 12, (num + 1) * 12)
        .map(({ dt, main, weather }) => ({
          dt,
          temp: main.temp,
          weather: weather[0].main,
        }))}
      margin={{
        top: 30,
        right: 30,
        left: 30,
        bottom: 10,
      }}
    >
      <XAxis dataKey="dt" fontSize={15} tickFormatter={formatXAxis} />
      <Line
        dataKey="temp"
        stroke="#3cb371"
        strokeWidth={2}
        dot={<CustomizedDot />}
        isAnimationActive={false}
      >
        <LabelList content={<CustomizedLabel />} />
      </Line>
    </LineChart>
  );
};

const WeatherGraph = () => {
  return (
    <Swiper>
      <SwiperSlide>
        <LineGraph num={0} />
      </SwiperSlide>
      <SwiperSlide>
        <LineGraph num={1} />
      </SwiperSlide>
      <SwiperSlide>
        <LineGraph num={2} />
      </SwiperSlide>
    </Swiper>
  );
};

export default WeatherGraph;
