import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce } from "underscore";

import "./Draggable.css";

const Draggable = ({ children, handleRef, x = 0, y = 0, onMove }) => {
  const divRef = useRef(null);
  const initialX = useRef(0);
  const initialY = useRef(0);
  const [position, setPosition] = useState({ x, y });

  const move = useMemo(() => debounce((x, y) => onMove(x, y), 500), [onMove]);

  const onMouseMove = useCallback(
    (e) => {
      setPosition({
        x: e.clientX - initialX.current,
        y: e.clientY - initialY.current,
      });
      move(e.clientX - initialX.current, e.clientY - initialY.current);
    },
    [move]
  );

  const removeEvents = useCallback(
    (e) => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", removeEvents);
      document.body.removeEventListener("mouseleave", removeEvents);
    },
    [onMouseMove]
  );

  const onMousedown = useCallback(
    (e) => {
      const { left, top } = e.target.getBoundingClientRect();
      initialX.current = e.clientX - left;
      initialY.current = e.clientY - top;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", removeEvents);
      document.body.addEventListener("mouseleave", removeEvents);
    },
    [onMouseMove, removeEvents]
  );

  useEffect(() => {
    const handler = handleRef.current;
    handler.addEventListener("mousedown", onMousedown);

    return () => {
      handler.removeEventListener("mousedown", onMousedown);
      move.cancel();
    };
  }, [handleRef, onMousedown, move]);

  return (
    <div
      ref={divRef}
      className="draggable"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </div>
  );
};

export default Draggable;
