import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BarChart = dynamic(() => import("./BarChart"));
const AnalysisCards = dynamic(() => import("./AnalysisCards"));
const TopBar = dynamic(() => import("./TopBar"));
// const PerformanceCharts = dynamic(() => import("./PerformanceCharts"));
const RevenueTable = dynamic(() => import("./ReveueTable"));

const ChatView = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  duration,
  setDuration,
  aggregatedBy,
  setAggregatedBy,
  offers,
  setProductTitle,
  productTitle,
  offersLoading,
  userApiKeys,
  setMarketplace,
  marketplace,
}) => {
  const [searchedText, setSearchedText] = useState("");
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = useQuery(
    ["overall-stats", startDate, endDate, productTitle, marketplace],
    async () => {
      const res = await fetch(`/api/overall-stats`, {
        body: JSON.stringify({
          apiKey: user?.apiKey,
          startDate,
          endDate,
          duration,
          productTitle,
          uid: user?.uid,
          marketplace,
        }),
        method: "POST",
      });
      const data = await res.json();
      // const comparisons = await fetch(`/api/overall-stats/comparison`, {
      //   body: JSON.stringify({
      //     apiKey: user?.apiKey,
      //     startDate,
      //     endDate,
      //     duration,
      //     data,
      //     productTitle,
      //     uid: user?.uid,
      //     marketplace,
      //   }),
      //   method: "POST",
      // });
      // const percents = await comparisons.json();
      // const finalData = { ...data, ...percents };
      return data;
    },
    {
      enabled: !!user || !!marketplace,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div className="relative">
      <TopBar
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        duration={duration}
        setDuration={setDuration}
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
