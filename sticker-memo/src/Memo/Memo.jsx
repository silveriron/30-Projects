import React, { useEffect, useMemo, useRef } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import Draggable from "@kichul7493/draggable";
import { debounce } from "underscore";

function Memo({ item, Delete, Edit, SetPosition, SetWidthHeight }) {
  const handleRef = useRef(null);
  const containerRef = useRef(null);

  const onMove = (x, y) => {
    SetPosition(item.id, x, y);
  };

  const onChangeContent = useMemo(
    () => debounce((e) => Edit(item.id, e.target.value)),
    [item.id, Edit]
  );

  const onChangeRect = useMemo(
    () =>
      debounce((entry) => {
        const { width, height } = entry[0].contentRect;
        SetWidthHeight(item.id, width, height);
      }, 100),
    [SetWidthHeight, item.id]
  );

  useEffect(() => {
    let RO = new ResizeObserver(onChangeRect);
    RO.observe(containerRef.current);
    return () => {
      onChangeContent.cancel();
      onChangeRect.cancel();
      RO.disconnect();
      RO = null;
    };
  }, [onChangeContent, onChangeRect]);

  const onClickClose = () => {
    Delete(item.id);
  };

  return (
    <Draggable handleRef={handleRef} x={item.x} y={item.y} onMove={onMove}>
      <div
        className="memo-container"
        style={{ width: `${item.width}px`, height: `${item.height}px` }}
        ref={containerRef}
      >
        <div className="menu">
          <DragHandleIcon
            ref={handleRef}
            sx={{ cursor: "move", fontSize: "25px" }}
          />
          <CloseIcon
            sx={{ cursor: "pointer", fontSize: "25px", float: "right" }}
            onClick={onClickClose}
          />
        </div>
        <textarea
          className="memo-text-area"
          defaultValue={item.content}
          name="txt"
          placeholder="Enter memo here"
          onChange={onChangeContent}
        ></textarea>
      </div>
    </Draggable>
  );
}

export default Memo;
