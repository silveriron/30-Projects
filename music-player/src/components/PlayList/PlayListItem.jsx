import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

function PlayListItem({ item, index }) {
  const { currentIndex } = useSelector((state) => state);
  const [duration, setDuration] = useState("00:00");
  const getDuration = (src) => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.onloadedmetadata = () => {
        const minute = `0${parseInt(audio.duration / 60, 10)}`;
        const second = `0${parseInt(audio.duration % 60, 10)}`;
        return resolve(`${minute}:${second.slice(-2)}`);
      };
      audio.src = src;
    });
  };

  useEffect(() => {
    const setDurationTime = async () => {
      const duration = await getDuration(item.src);
      setDuration(duration);
    };
    setDurationTime();
  }, [item.src]);

  return (
    <>
      <div className={classNames("row", { playing: currentIndex === index })}>
        <span>{item.name}</span>
        <p>{item.artist}</p>
      </div>
      <span className={classNames("music-duration")}>{duration}</span>
    </>
  );
}

export default PlayListItem;
