import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./ProgressArea.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  nextMusic,
  playMusic,
  stopMusic,
} from "../../store/musicPlayerReducer";

function ProgressArea(props, ref) {
  const audio = useRef();
  const progressBarRef = useRef();
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(`00:00`);
  const [duration, setDuration] = useState("00:00");
  const { playList, currentIndex, repeat } = useSelector((state) => state);

  useImperativeHandle(ref, () => ({
    play: () => {
      audio.current.play();
    },
    pause: () => {
      audio.current.pause();
    },
    changeVolume: (volume) => {
      audio.current.volume = volume;
    },
    resetPlay: () => {
      audio.current.currentTime = 0;
    },
  }));

  const onPlay = () => dispatch(playMusic());

  const onPause = () => dispatch(stopMusic());

  const getTime = (time) => {
    const minute = `0${parseInt(time / 60, 10)}`;
    const second = `0${parseInt(time % 60, 10)}`;
    return `${minute.slice(-2)}:${second.slice(-2)}`;
  };

  const onTimeUpdate = (e) => {
    const currentTime = e.currentTarget.currentTime;
    const duration = e.currentTarget.duration;
    progressBarRef.current.style.width = `${(currentTime / duration) * 100}%`;
    currentTime > 0 && setCurrentTime(getTime(currentTime));
    duration > 0 && setDuration(getTime(duration));
  };

  const onClickProgressBar = (e) => {
    if (
      e.target.className === "progress-area" ||
      e.target.className === "progress-bar"
    ) {
      const clientWidth = e.currentTarget.clientWidth;
      const offsetX = e.nativeEvent.offsetX;
      const duration = audio.current.duration;
      audio.current.currentTime = (offsetX / clientWidth) * duration;
    }
  };

  const onEnded = () => {
    if (repeat === "ONE") {
      audio.current.currentTime = 0;
      audio.current.play();
    } else {
      dispatch(nextMusic());
    }
  };

  return (
    <div className="progress-area" onMouseDown={onClickProgressBar}>
      <div className="progress-bar" ref={progressBarRef}>
        <audio
          autoPlay
          onEnded={onEnded}
          ref={audio}
          onPlay={onPlay}
          onPause={onPause}
          src={playList[currentIndex].src}
          onTimeUpdate={onTimeUpdate}
        ></audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default forwardRef(ProgressArea);
