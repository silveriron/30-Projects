import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { timeTableState } from "../store/store";
import { v1 as uuidv1 } from "uuid";
import { useEffect } from "react";

const checktime = (A, B) =>
  A.start < B.start ? A.end > B.start : B.end > A.start;

const timeOptions = new Array(12)
  .fill(null)
  .map((_, i) => ({ value: i + 9, label: i + 9 }));

const InputModal = ({ showModal, handleClose, lectureInfo }) => {
  const {
    formState: { errors },
    control,
    getValues,
    handleSubmit,
    reset,
  } = useForm();
  const [timeTable, setTimeTable] = useRecoilState(timeTableState);

  useEffect(() => {
    if (showModal) {
      reset({
        lectureName: lectureInfo.name ? lectureInfo.name : "",
        day: lectureInfo.day ? lectureInfo.day : "mon",
        startTime: lectureInfo.start ? lectureInfo.start : "9",
        endTime: lectureInfo.end ? lectureInfo.end : "10",
        lectureColor: lectureInfo.color ? lectureInfo.color : "#000000",
      });
    }
  }, [showModal, lectureInfo, reset]);

  const onSubmit = useCallback(
    ({ lectureName, lectureColor, day, startTime, endTime }) => {
      let valid = true;

      for (let i = 0; i < timeTable[day].length; i++) {
        if (checktime(timeTable[day][i], { start: startTime, end: endTime })) {
          valid = false;
          break;
        }
      }

      if (!valid) {
        alert("강의 시간에 이미 강의가 있습니다.");
        return;
      }

      const data = {
        start: startTime,
        end: endTime,
        name: lectureName,
        color: lectureColor,
        id: uuidv1(),
      };

      if (lectureInfo.name) {
        console.log(lectureInfo.day);
        const newDayTimeTable = timeTable[lectureInfo.day].filter(
          (item) => item.id !== lectureInfo.id
        );
        setTimeTable((prev) => ({
          ...prev,
          [lectureInfo.day]: [...newDayTimeTable],
          [day]: [...prev[day], data],
        }));

        handleClose();
        return;
      }

      setTimeTable((prev) => ({
        ...prev,
        [day]: [...prev[day], data],
      }));

      handleClose();
    },
    [timeTable, setTimeTable, handleClose, lectureInfo]
  );

  return (
    <Dialog open={showModal} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>강의정보 입력</DialogTitle>
        <DialogContent style={{ width: "400px" }}>
          <Controller
            control={control}
            name="lectureName"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors.lectureName}
                  style={{ marginTop: "30px", width: "350px" }}
                  label="강의명"
                />
              );
            }}
          />
          {errors.lectureName?.type === "required" && (
            <p style={{ color: "red" }}>강의명을 입력해주세요.</p>
          )}
          <Controller
            control={control}
            name="day"
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup {...field} style={{ display: "block" }}>
                <FormControlLabel value="mon" control={<Radio />} label="Mon" />
                <FormControlLabel value="tue" control={<Radio />} label="Tue" />
                <FormControlLabel value="wed" control={<Radio />} label="Wed" />
                <FormControlLabel value="thu" control={<Radio />} label="Thu" />
                <FormControlLabel value="fri" control={<Radio />} label="Fri" />
              </RadioGroup>
            )}
          />
          <Stack spacing={3} style={{ marginTop: "30px", width: "350px" }}>
            <Controller
              control={control}
              name="startTime"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  error={
                    !!errors.startTime || !!errors.endTime?.type === "validate"
                  }
                  style={{ marginTop: "30px", width: "350px" }}
                  label="시작 시간"
                  placeholder="시작 시간 선택"
                >
                  {timeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {errors.startTime?.type === "required" && (
              <p style={{ color: "red" }}>시작 시간을 확인해주세요.</p>
            )}
            {errors.endTime?.type === "validate" && (
              <p style={{ color: "red" }}>
                시작 시간과 종료 시간을 확인해주세요.
              </p>
            )}
            <Controller
              control={control}
              name="endTime"
              rules={{
                required: true,
                validate: (value) => getValues("startTime") < value,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  error={!!errors.endTime}
                  style={{ marginTop: "30px", width: "350px" }}
                  label="종료 시간"
                  placeholder="종료 시간 선택"
                >
                  {timeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {errors.endTime?.type === "required" && (
              <p style={{ color: "red" }}>종료 시간을 확인해주세요.</p>
            )}
            {errors.endTime?.type === "validate" && (
              <p style={{ color: "red" }}>
                시작 시간과 종료 시간을 확인해주세요.{" "}
              </p>
            )}
          </Stack>
          <div style={{ marginTop: "30px" }}>
            <label htmlFor="lectureColor">시간표 색상:</label>
            <Controller
              control={control}
              name="lectureColor"
              render={({ field }) => (
                <input {...field} type="color" style={{ marginLeft: "30px" }} />
              )}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button type="submit">입력</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InputModal;
