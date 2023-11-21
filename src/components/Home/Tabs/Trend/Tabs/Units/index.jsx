import TrendTable from "../../TrendTable";
import CustomRangeTrend from "../../TrendTable/CustomRangeTrend";
import Last30DaysTrend from "../../TrendTable/Last30DaysTrend";
import Last3MonthsTrend from "../../TrendTable/Last3MonthsTrend";

const Units = ({
  data,
  dates,
  isLoading,
  last12MonthsCols,
  last3MonthsCols,
  last30DaysCols,
  columns,
  duration,
  customRangeCols,
  showTrendChart,
  setShowTrendChart,
  trendChartData,
  setTrendChartData,
  active
}) => {
  return (
    <div>
      {duration === "Last 12 Months" && (
        <TrendTable
          isLoading={isLoading}
          data={data}
          // currencySign={true}
          dates={dates}
          columns={columns}
          cols={last12MonthsCols}
          showTrendChart={showTrendChart}
          setShowTrendChart={setShowTrendChart}
          trendChartData={trendChartData}
          active={active}
          setTrendChartData={setTrendChartData}
        />
      )}
      {duration === "Last 3 Months" && (
        <Last3MonthsTrend
          isLoading={isLoading}
          data={data}
          dates={dates}
          columns={columns}
          cols={last3MonthsCols}
          showTrendChart={showTrendChart}
          active={active}
          setShowTrendChart={setShowTrendChart}
          trendChartData={trendChartData}
          setTrendChartData={setTrendChartData}
        />
      )}
      {duration === "Last 30 Days" && (
        <Last30DaysTrend
          isLoading={isLoading}
          data={data}
          dates={dates}
          columns={columns}
          active={active}
          cols={last30DaysCols}
          showTrendChart={showTrendChart}
          setShowTrendChart={setShowTrendChart}
          trendChartData={trendChartData}
          setTrendChartData={setTrendChartData}
        />
      )}
      {duration === "Custom" && (
        <CustomRangeTrend
          isLoading={isLoading}
          data={data}
          dates={dates}
          columns={columns}
          active={active}
          cols={customRangeCols}
          showTrendChart={showTrendChart}
          setShowTrendChart={setShowTrendChart}
          trendChartData={trendChartData}
          setTrendChartData={setTrendChartData}
        />
      )}
    </div>
  );
};

export default Units;
