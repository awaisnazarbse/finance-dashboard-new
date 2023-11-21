import dynamic from "next/dynamic";
import ChartLabels from "./ChartLabels";
import { useEffect, useState } from "react";
import Loader from "@/components/utils/Loader";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

const PerformanceChart = dynamic(() => import("./PerformanceChart"));
const JHPPerformance = () => {
  // const [data, setData] = useState();
  // const [loading, setLoading] = useState(true);

  // const fetchData = async () => {
  //   const jhbPerformance = await (
  //     await fetch(
  //       "/api/sales/performance/JHB"
  //     )
  //   ).json();

  //   setData(jhbPerformance);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  
  const { user } = useAuth();

  const { data, isLoading } = useQuery(
    ["jhb-performance"],
    async () => {
      const jhbPerformance = await (
        await fetch("/api/sales/performance/JHB", {
          body: JSON.stringify({
            apiKey: user?.apiKey,
          }),
          method: "POST",
        })
      ).json();
      return jhbPerformance;
    },
    {
      enabled: !!user,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className="p-5 bg-white flex flex-col space-y-4 rounded-[10px]"
      style={{
        boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
    >
      <span className="text-black text-base font-semibold">
        JHP Performance
      </span>
      <div className="grid grid-cols-2 place-items-center pl-6 h-full">
        <PerformanceChart performance={data}  />
        <ChartLabels />
      </div>
    </div>
  );
};

export default JHPPerformance;
