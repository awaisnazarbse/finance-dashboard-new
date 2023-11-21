import dynamic from "next/dynamic";
import { useState } from "react";

const BarChart = dynamic(() => import("./BarChart"));
const AnalysisCards = dynamic(() => import("./AnalysisCards"));
const TopBar = dynamic(() => import("./TopBar"));
// const PerformanceCharts = dynamic(() => import("./PerformanceCharts"));
const RevenueTable = dynamic(() => import("./ReveueTable"));

const ChatView = ({
  stats,
  statsLoading,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  duration,
  setDuration,
  aggregatedBy,
  setAggregatedBy,
  setOverallStats,
  offers,
  setProductTitle,
  productTitle,
  offersLoading,
  userApiKeys,
  setMarketplace,
  marketplace,
}) => {
  const [searchedText, setSearchedText] = useState("");
  return (
    <div className="relative">
      <TopBar
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        duration={duration}
        setDuration={setDuration}
        setOverallStats={setOverallStats}
        aggregatedBy={aggregatedBy}
        setAggregatedBy={setAggregatedBy}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
        offers={offers}
        setProductTitle={setProductTitle}
        offersLoading={offersLoading}
        userApiKeys={userApiKeys}
        setMarketplace={setMarketplace}
        marketplace={marketplace}
      />
      <AnalysisCards data={stats} statsLoading={statsLoading} />
      <BarChart
        productTitle={productTitle}
        startDate={startDate}
        endDate={endDate}
        duration={duration}
        aggregatedBy={aggregatedBy}
        marketplace={marketplace}
      />
      {/* <PerformanceCharts /> */}
      <RevenueTable
        searchedText={searchedText}
        startDate={startDate}
        endDate={endDate}
        productTitle={productTitle}
        duration={duration}
        marketplace={marketplace}
      />
    </div>
  );
};

export default ChatView;
