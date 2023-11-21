import { useState } from "react";
import HeatMap from "./HeadtMap";
import TopBar from "./TopBar";
import BarChartComponent from "./BarChart";
import BarChartComponentDayOfWeek from "./BarChartDayOfWeek";

const SalesHeatMap = () => {
  const [duration, setDuration] = useState("30 days")
  const [type, setType] = useState("By units")
  return (
    <>
      <TopBar setDuration={setDuration} setType={setType} />
      <HeatMap duration={duration} type={type} />
      <BarChartComponent duration={duration} type={type} />
      <BarChartComponentDayOfWeek duration={duration} type={type} />
    </>
  );
};

export default SalesHeatMap;
