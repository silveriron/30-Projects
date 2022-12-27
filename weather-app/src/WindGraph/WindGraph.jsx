import React, { useContext } from "react";
import { Bar, BarChart, LabelList, XAxis } from "recharts";
import { formatXAxis } from "../WeatherGraph/WeatherGraph";
import { WeatherContext } from "../WeatherProvider/WeatherProvider";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const CustomizedLabel = function ({ x, y, value }) {
  return (
    <text x={x + 30} y={y - 5} fontSize="15" textAnchor="middle">
      {value}m/s
    </text>
  );
};

const BarGraph = ({ num }) => {
  const { hourly } = useContext(WeatherContext);

  return (
    <BarChart
      width={960}
      height={200}
      data={hourly
        .slice(num * 12, (num + 1) * 12)
        .map(({ dt, wind }) => ({ dt, speed: wind.speed }))}
      margin={{
        top: 30,
        right: 30,
        left: 30,
        bottom: 10,
      }}
    >
      <XAxis dataKey="dt" fontSize={15} tickFormatter={formatXAxis} />
      <Bar dataKey="speed" fill="#00dd93" isAnimationActive={false}>
        <LabelList content={<CustomizedLabel />} />
      </Bar>
    </BarChart>
  );
};

const WindGraph = () => {
  return (
    <Swiper>
      <SwiperSlide>
        <BarGraph num={0} />
      </SwiperSlide>
      <SwiperSlide>
        <BarGraph num={1} />
      </SwiperSlide>
      <SwiperSlide>
        <BarGraph num={2} />
      </SwiperSlide>
    </Swiper>
  );
};

export default WindGraph;
