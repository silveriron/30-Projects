import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import WeatherGraph from "../WeatherGraph/WeatherGraph";
import HumidityGraph from "../HumidityGraph/HumidityGraph";
import WindGraph from "../WindGraph/WindGraph";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <p>{children}</p>}
    </div>
  );
}

const WeatherTaps = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => setValue(newValue);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="날씨" />
          <Tab label="습도" />
          <Tab label="바람" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <WeatherGraph />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HumidityGraph />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WindGraph />
      </TabPanel>
    </>
  );
};

export default WeatherTaps;
