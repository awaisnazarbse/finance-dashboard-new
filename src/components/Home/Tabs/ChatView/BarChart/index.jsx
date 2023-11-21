import { Button, Select } from "antd";
import Image from "next/image";
import dynamic from "next/dynamic";
import Loader from "@/components/utils/Loader";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import AnalysisChartConfigurationModal from "./AnalysisChartConfigurationModal";

const AnalysisChart = dynamic(() => import("./AnalysisChart"));
const NetProfit = dynamic(() => import("../ReveueTable/NetProfit"));

const BarChart = ({
  productTitle,
  startDate,
  endDate,
  duration,
  aggregatedBy,
  marketplace,
}) => {
  const [graphData, setGraphData] = useState([]);
  const [graphLabels, setGraphLabels] = useState([]);
  const configRef = useRef(null);
  const [configurationModal, setConfigurationModal] = useState(false);
  const [configurations, setConfigurations] = useState([
    "Units sold",
    "Sales",
    "Gross profit",
    "Orders",
  ]);

  const { user } = useAuth();

  const { data, isLoading } = useQuery(
    [
      "current-year-sales",
      startDate,
      endDate,
      productTitle,
      duration,
      aggregatedBy,
      marketplace,
    ],
    async () => {
      const res = await fetch(`/api/sales/current-year`, {
        body: JSON.stringify({
          apiKey: user?.apiKey,
          productTitle,
          duration,
          groupBy: aggregatedBy,
          startDate,
          endDate,
          marketplace,
          uid: user?.uid,
        }),
        method: "POST",
      });

      const allRevs = await res.json();
      console.log("allRevs",allRevs)
      setGraphData([
        {
          type: "line",
          label: "Orders",
          data: allRevs?.metrics?.orders,
          yAxisID: "y1",
          pointStyle: "circle",
          tension: 0.5,
          borderColor: "#ACB1AD",
          pointRadius: 5,
          backgroundColor: "transparent",
        },
        {
          type: "line",
          label: "Units sold",
          data: allRevs?.metrics?.unitSold,
          yAxisID: "y1",
          pointStyle: "circle",
          pointRadius: 5,
          borderColor: "#1F4BFC",
          tension: 0.5,
          backgroundColor: "transparent",
        },
        {
          type: "bar",
          data: allRevs?.metrics?.rev,
          yAxisID: "y",
          pointStyle: "rect",
          backgroundColor: "#99DA60",
          label: "Sales",
        },
        {
          type: "bar",
          data: allRevs?.metrics?.grossProfit,
          yAxisID: "y",
          pointStyle: "rect",
          backgroundColor: "#873975",
          label: "Gross profit",
        },
      ]);
      setGraphLabels(allRevs?.timeIntervals);
      console.log("all revs", allRevs);
      return allRevs?.metrics;
    },
    {
      enabled: !!user || !!marketplace,
      refetchOnWindowFocus: false,
    }
  );

  const onClick = (type) => {
    if (type === "account overview") {
      setGraphData([
        {
          type: "line",
          label: "Units sold",
          data: data?.unitSold,
          yAxisID: "y1",
          pointStyle: "circle",
          pointRadius: 5,
          borderColor: "#1F4BFC",
          backgroundColor: "transparent",
          tension: 0.5,
        },
        {
          type: "line",
          label: "Refunds",
          data: data?.refunds,
          yAxisID: "y1",
          pointStyle: "circle",
          tension: 0.5,
          borderColor: "#FF3714",
          pointRadius: 5,
          backgroundColor: "transparent",
        },
        {
          type: "bar",
          label: "Net profit",
          data: data?.refundCost,
          yAxisID: "y",
          pointStyle: "rect",
          backgroundColor: "#93B5C6",
        },
      ]);
    }
    if (type === "sales analysis") {
      setGraphData([
        {
          type: "line",
          tension: 0.5,
          label: "Units sold",
          data: data?.unitSold,
          yAxisID: "y1",
          pointStyle: "circle",
          pointRadius: 5,
          borderColor: "#1F4BFC",
          backgroundColor: "transparent",
        },
        {
          type: "line",
          label: "Orders",
          data: data?.orders,
          tension: 0.5,
          yAxisID: "y1",
          pointStyle: "circle",
          borderColor: "#ACB1AD",
          pointRadius: 5,
          backgroundColor: "transparent",
        },
        {
          type: "bar",
          data: data?.rev,
          yAxisID: "y",
          pointStyle: "rect",
          backgroundColor: "#99DA60",
          label: "Sales",
        },
        {
          type: "bar",
          data: data?.rev,
          yAxisID: "y",
          pointStyle: "rect",
          backgroundColor: "#FF73A4",
          label: "Gross profit",
        },
        {
          type: "bar",
          label: "Net profit",
          data: data?.refundCost,
          yAxisID: "y",
          pointStyle: "rect",
          backgroundColor: "#93B5C6",
        },
      ]);
    }
    if (type === "refund analysis") {
      setGraphData([
        {
          type: "line",
          label: "Refunds",
          data: data?.refunds,
          yAxisID: "y1",
          pointStyle: "circle",
          tension: 0.5,
          borderColor: "#FF3714",
          pointRadius: 5,
          backgroundColor: "transparent",
        },
        {
          type: "line",
          label: "% Refunds",
          data: data?.refundPercent,
          tension: 0.5,
          yAxisID: "y1",
          pointStyle: "circle",
          borderColor: "#F59B72",
          pointRadius: 5,
          backgroundColor: "transparent",
        },
      ]);
    }
  };

  const handleOutsideClick = (e) => {
    if (configRef.current && !configRef.current.contains(e.target)) {
      setConfigurationModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 p-5">
      <div
        className="w-full md:w-[70%] px-4 md:px-8 py-4 flex flex-col space-y-8 bg-white rounded-[10px]"
        style={{
          boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-row-reverse gap-4">
            <div className="flex flex-col space-y-4">
              {/* <Button
                className="btn-primay w-fit md:px-5 md:py-4 flex items-center justify-center border-none outline-none text-white text-xs md:text-sm bg-[#F7B614]"
                onClick={() => onClick("account overview")}
              >
                Account Overview
              </Button>
              <Button
                className="btn-primay w-fit md:px-5 md:py-4 flex items-center justify-center border-none outline-none text-black text-xs md:text-sm bg-red-600 bg-opacity-20"
                onClick={() => onClick("refund analysis")}
              >
                Refund Analysis
              </Button>
              <Button
                className="btn-primay w-fit md:px-5 md:py-4 flex items-center justify-center border-none outline-none text-black text-xs md:text-sm bg-[#F7B614] bg-opacity-20"
                onClick={() => onClick("sales analysis")}
              >
                Sales Analysis
              </Button> */}
              <div
                className="flex items-center cursor-pointer space-x-2 relative"
                ref={configRef}
              >
                <Image
                  alt="alt text"
                  src="/icons/config.svg"
                  width={14}
                  height={14}
                />
                <span
                  className="text-sm text-black"
                  onClick={() => setConfigurationModal(!configurationModal)}
                >
                  Configuration
                </span>
                {configurationModal && (
                  <div className="absolute top-7 left-0 z-50">
                    <AnalysisChartConfigurationModal
                      configurations={configurations}
                      setConfigurations={setConfigurations}
                      setGraphData={setGraphData}
                      data={data}
                    />
                  </div>
                )}
              </div>

              <Select
                options={[
                  { label: "Account Overview", value: "account overview" },
                  { label: "Refund Analysis", value: "refund analysis" },
                  { label: "Sales Analysis", value: "sales analysis" },
                ]}
                placeholder="Account Overview"
                onChange={(e) => {
                  onClick(e);
                }}
                style={{
                  width: "11rem",
                }}
              />
            </div>
            {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:items-center md:space-x-72 ">
             
            </div> */}

            <div className="w-full relative h-full">
              <AnalysisChart
                overviewData={graphData}
                graphLabels={graphLabels}
              />
            </div>
          </div>
        )}
      </div>
      <NetProfit
        productTitle={productTitle}
        startDate1={startDate}
        endDate1={endDate}
        duration={duration}
        marketplace={marketplace}
      />
    </div>
  );
};

export default BarChart;
