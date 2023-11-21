import dynamic from "next/dynamic";

const CPTPerformance = dynamic(() => import("./CPTPerformance"));
const JHPPerformance = dynamic(() => import("./JHPPerformance"));
const OverallPerformance = dynamic(() => import("./OverallPerformance"));

const PerformanceCharts = () => {
  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
      <OverallPerformance />
      <CPTPerformance />
      <JHPPerformance />
    </div>
  );
};

export default PerformanceCharts;
