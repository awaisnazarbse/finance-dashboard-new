import { useState } from "react";
import Sales from "./Sales";
import Units from "./Units";
import PercentRefunds from "./PercentRefunds";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Tabs = ({
  duration,
  dates,
  last12MonthsCols,
  last3MonthsCols,
  setLast12MonthsCols,
  setLast3MonthsCols,
  last30DaysCols,
  setLast30DaysCols,
  customRangeCols,
  setCustomRangeCols,
  showTrendChart,
  setShowTrendChart,
  trendChartData,
  setTrendChartData,
  searchedText,
}) => {
  const [active, setActive] = useState("Sales");
  const [columns, setColumns] = useState();
  const [salesData, setSalesData] = useState([]);
  const [unitsData, setUnitsData] = useState([]);
  const [percentRefundsData, setPercentRefundsData] = useState([]);
  const tabs = ["Sales", "Units", "Returns"];

  const { user } = useAuth();
  const { data, isLoading } = useQuery(
    ["trend", dates, active],
    async () => {
      const res = await axios.post(
        `http://localhost:3000/sales/trend_test`,
        // "https://finance-dashboard-server-smoky.vercel.app/sales/trend_test",
        {
          apiKey: user?.apiKey,
          type: active,
          duration,
          dates,
        }
      );
      if (duration === "Last 12 Months") {
        setLast12MonthsCols(res.data?.cols);
      }

      if (duration === "Last 3 Months") {
        setLast3MonthsCols(res.data?.cols);
      }

      if (duration === "Last 30 Days") {
        setLast30DaysCols(res?.data?.cols);
      }

      console.log("res in trend", res.data.data);

      if (duration === "Custom") {
        setCustomRangeCols(res?.data?.cols);
      }

      if (active === "Sales") {
        setSalesData(res.data?.data);
      }
      if (active === "Units") {
        setUnitsData(res.data?.data);
      }
      if (active === "Returns") {
        setPercentRefundsData(res.data?.data);
      }

      return res.data?.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="p-5">
      <div className="flex flex-col space-y-2 bg-white rounded-[10px] p-5 w-full">
        <div className="flex items-center flex-wrap gap-5">
          {tabs?.map((e, i) => (
            <button
              key={i}
              className="p-1 flex items-start justify-center text-base font-medium"
              style={{
                color: active === e ? "#F7B614" : "black",
              }}
              onClick={() => setActive(e)}
            >
              {e}
            </button>
          ))}
        </div>
        {active === "Sales" && (
          <Sales
            data={salesData}
            columns={columns}
            isLoading={isLoading}
            dates={dates}
            last3MonthsCols={last3MonthsCols}
            last30DaysCols={last30DaysCols}
            last12MonthsCols={last12MonthsCols}
            customRangeCols={customRangeCols}
            duration={duration}
            showTrendChart={showTrendChart}
            setShowTrendChart={setShowTrendChart}
            trendChartData={trendChartData}
            active={active}
            setTrendChartData={setTrendChartData}
            searchedText={searchedText}
          />
        )}
        {active === "Units" && (
          <Units
            data={unitsData}
            columns={columns}
            isLoading={isLoading}
            dates={dates}
            last3MonthsCols={last3MonthsCols}
            last30DaysCols={last30DaysCols}
            last12MonthsCols={last12MonthsCols}
            customRangeCols={customRangeCols}
            duration={duration}
            showTrendChart={showTrendChart}
            setShowTrendChart={setShowTrendChart}
            trendChartData={trendChartData}
            setTrendChartData={setTrendChartData}
            active={active}
            searchedText={searchedText}
          />
        )}
        {active === "Returns" && (
          <PercentRefunds
            data={percentRefundsData}
            columns={columns}
            isLoading={isLoading}
            dates={dates}
            last3MonthsCols={last3MonthsCols}
            last30DaysCols={last30DaysCols}
            last12MonthsCols={last12MonthsCols}
            customRangeCols={customRangeCols}
            duration={duration}
            showTrendChart={showTrendChart}
            setShowTrendChart={setShowTrendChart}
            trendChartData={trendChartData}
            setTrendChartData={setTrendChartData}
            active={active}
            searchedText={searchedText}
          />
        )}
      </div>
    </div>
  );
};

export default Tabs;
