import React, { useRef } from "react";
import Draggable from "./lib/Draggable";

const App = () => {
  const handleRef = useRef(null);

  const onMove = (x, y) => {
    console.log(x, y);
  };

  return (
    <Draggable handleRef={handleRef} onMove={onMove}>
      <div style={{ width: 100, height: 100, backgroundColor: "yellow" }}>
        <button ref={handleRef}>click</button>
      </div>
    </Draggable>
  );
};

export default App;
