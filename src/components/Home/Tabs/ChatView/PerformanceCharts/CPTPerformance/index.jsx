import dynamic from "next/dynamic";
import ChartLabels from "./ChartLabels";
import { useEffect, useState } from "react";
import Loader from "@/components/utils/Loader";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const PerformanceChart = dynamic(() => import("./PerformanceChart"));

const CPTPerformance = () => {
  // const [data, setData] = useState();
  // const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const { data, isLoading } = useQuery(
    ["cpt-performance"],
    async () => {
      const cptPerformance = await (
        await fetch("/api/sales/performance/CPT", {
          body: JSON.stringify({
            apiKey: user?.apiKey,
          }),
          method: "POST",
        })
      ).json();
      return cptPerformance;
    },
    {
      enabled: !!user,
    }
  );

  // const fetchData = async () => {
  //   const cptPerformance = await (
  //     await fetch("/api/sales/performance/CPT")
  //   ).json();

  //   setData(cptPerformance);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

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
        CPT Performance
      </span>
      <div className="grid grid-cols-2 place-items-center pl-6 h-full">
        <PerformanceChart performance={data} />
        <ChartLabels />
      </div>
    </div>
  );
};

export default CPTPerformance;
