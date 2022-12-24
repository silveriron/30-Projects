import { TableCell } from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { timeTableState } from "../store/store";
import { useState } from "react";

const TimeTableCell = ({ day, timeNum, editTimeTable }) => {
  const [timeTable, setTimeTable] = useRecoilState(timeTableState);
  const [show, setShow] = useState(false);

  const timeData = useMemo(
    () =>
      timeTable[day].find(
        (time) => time.start <= timeNum && timeNum < time.end
      ),
    [timeNum, timeTable, day]
  );

  const onClickEdit = () => {
    editTimeTable(timeData, day);
  };

  const onClickDelete = () => {
    setTimeTable((prev) => ({
      ...prev,
      [day]: prev[day].filter((item) => item.id !== timeData.id),
    }));
  };

  return (
    <>
      {timeData?.start === timeNum ? (
        <TableCell
          style={{ backgroundColor: timeData.color, position: "relative" }}
          align="center"
          rowSpan={timeData.end - timeData.start}
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {timeData.name}
          {show && (
            <div style={{ position: "absolute", top: "5px", right: "5px" }}>
              <EditIcon style={{ cursor: "pointer" }} onClick={onClickEdit} />
              <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={onClickDelete}
              />
            </div>
          )}
        </TableCell>
      ) : timeData?.start < timeNum && timeData?.end > timeNum ? null : (
        <TableCell />
      )}
    </>
  );
};

export default TimeTableCell;
