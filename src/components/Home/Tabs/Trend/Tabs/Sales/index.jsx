import TrendTable from "../../TrendTable";
import CustomRangeTrend from "../../TrendTable/CustomRangeTrend";
import Last30DaysTrend from "../../TrendTable/Last30DaysTrend";
import Last3MonthsTrend from "../../TrendTable/Last3MonthsTrend";

const Sales = ({
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
  active,
  searchedText
}) => {
  return (
    <div>
      {duration === "Last 12 Months" && (
        <TrendTable
          isLoading={isLoading}
          data={data}
          currencySign={true}
          dates={dates}
          columns={columns}
          cols={last12MonthsCols}
          showTrendChart={showTrendChart}
          setShowTrendChart={setShowTrendChart}
          trendChartData={trendChartData}
          setTrendChartData={setTrendChartData}
          active={active}
          searchedText={searchedText}
        />
      )}
      {duration === "Last 3 Months" && (
        <Last3MonthsTrend
          isLoading={isLoading}
          data={data}
          currencySign={true}
          dates={dates}
          columns={columns}
          cols={last3MonthsCols}
          showTrendChart={showTrendChart}
          setShowTrendChart={setShowTrendChart}
          trendChartData={trendChartData}
          setTrendChartData={setTrendChartData}
          active={active}
          searchedText={searchedText}
        />
      )}
      {duration === "Last 30 Days" && (
        <Last30DaysTrend
          isLoading={isLoading}
          data={data}
          currencySign={true}
          dates={dates}
          columns={columns}
          cols={last30DaysCols}
          showTrendChart={showTrendChart}
          setShowTrendChart={setShowTrendChart}
          trendChartData={trendChartData}
          setTrendChartData={setTrendChartData}
          active={active}
          searchedText={searchedText}
        />
      )}
      {duration === "Custom" && (
        <CustomRangeTrend
          isLoading={isLoading}
          data={data}
          dates={dates}
          currencySign={true}
          columns={columns}
          cols={customRangeCols}
          showTrendChart={showTrendChart}
          setShowTrendChart={setShowTrendChart}
          trendChartData={trendChartData}
          setTrendChartData={setTrendChartData}
          active={active}
          searchedText={searchedText}
        />
      )}
    </div>
  );
};

export default Sales;
