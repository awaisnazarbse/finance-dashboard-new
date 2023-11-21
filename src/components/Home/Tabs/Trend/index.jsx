import Tabs from "./Tabs";
import TopBar from "../PAndL/TopBar";
import { useState } from "react";
import { getLast12Months } from "@/utils/getLast12Months";
import dayjs from "dayjs";

const Trend = ({ userApiKeys }) => {
  const [searchedText, setSearchedText] = useState("");
  const [showTrendChart, setShowTrendChart] = useState(false);
  const [trendChartData, setTrendChartData] = useState({});
  const [duration, setDuration] = useState("Last 3 Months");
  const [dates, setDates] = useState([
    dayjs().subtract(3, "months").startOf("month"),
    dayjs(),
  ]);

  const [last12MonthsCols, setLast12MonthsCols] = useState(getLast12Months());
  const [last3MonthsCols, setLast3MonthsCols] = useState([]);
  const [last30DaysCols, setLast30DaysCols] = useState([]);
  const [customRangeCols, setCustomRangeCols] = useState([]);

  return (
    <>
      <TopBar
        dates={dates}
        setDates={setDates}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
        duration={duration}
        setDuration={setDuration}
        userApiKeys={userApiKeys}
        page={"trend"}
      />
      <Tabs
        duration={duration}
        dates={dates}
        last12MonthsCols={last12MonthsCols}
        last3MonthsCols={last3MonthsCols}
        setLast12MonthsCols={setLast12MonthsCols}
        setLast3MonthsCols={setLast3MonthsCols}
        setLast30DaysCols={setLast30DaysCols}
        last30DaysCols={last30DaysCols}
        setCustomRangeCols={setCustomRangeCols}
        customRangeCols={customRangeCols}
        showTrendChart={showTrendChart}
        setShowTrendChart={setShowTrendChart}
        trendChartData={trendChartData}
        setTrendChartData={setTrendChartData}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
      />
    </>
  );
};

export default Trend;
