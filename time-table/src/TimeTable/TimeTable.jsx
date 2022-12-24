import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TimeTableRow from "./TimeTableRow";
import InputModal from "../InputModal/InputModal";

const hourData = Array.from({ length: 11 }, (i, j) => j + 9);

const styles = () => ({
  Table: {
    "& th,td": {
      border: "1px solid rgba(224, 224, 224, 1)",
    },
  },
});

const TimeTable = ({ classes }) => {
  const [showModal, setShowModal] = useState(false);
  const [lectureInfo, setLectureInfo] = useState({});

  const editTimeTable = (lecture, day) => {
    setLectureInfo({ ...lecture, day });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setLectureInfo({});
  };

  return (
    <TableContainer
      sx={{ width: "80%", minWidth: "650px", margin: "200px auto 0 auto" }}
    >
      <Typography variant="h2" fontWeight={10} component="div" align="center">
        강의시간표
      </Typography>
      <Button
        variant="contained"
        sx={{ float: "right" }}
        endIcon={<AddBoxIcon />}
        onClick={() => setShowModal(true)}
      >
        강의추가
      </Button>
      <Table className={classes.Table}>
        <TableHead>
          <TableRow>
            <TableCell align="center" width={100}>
              Time
            </TableCell>
            <TableCell align="center" width={200}>
              Mon
            </TableCell>
            <TableCell align="center" width={200}>
              Tue
            </TableCell>
            <TableCell align="center" width={200}>
              Wed
            </TableCell>
            <TableCell align="center" width={200}>
              Thu
            </TableCell>
            <TableCell align="center" width={200}>
              Fri
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hourData.map((time, index) => {
            return (
              <TableRow key={index}>
                <TableCell align="center" width={100}>
                  {`${time}:00 - ${time + 1}:00`}
                </TableCell>
                <TimeTableRow timeNum={time} editTimeTable={editTimeTable} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <InputModal
        showModal={showModal}
        handleClose={handleClose}
        lectureInfo={lectureInfo}
      />
    </TableContainer>
  );
};

export default withStyles(styles)(TimeTable);
