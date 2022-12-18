import "./App.scss";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/ProgrssArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";
import React, { useRef, useState } from "react";

function App() {
  const audioRef = useRef();
  const [isShowPlayList, setIsShowPlayList] = useState(false);

  const onPlay = () => {
    audioRef.current.play();
  };

  const onPause = () => {
    audioRef.current.pause();
  };

  const changeVolume = (volume) => {
    audioRef.current.changeVolume(volume);
  };

  const resetPlay = () => {
    audioRef.current.resetPlay();
  };
  return (
    <div className="App">
      <div className="container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          play={onPlay}
          pause={onPause}
          changeVolume={changeVolume}
          resetPlay={resetPlay}
          setIsShowPlayList={setIsShowPlayList}
        />
        <PlayList
          setIsShowPlayList={setIsShowPlayList}
          isShowPlayList={isShowPlayList}
        />
      </div>
    </div>
  );
}

export default App;
