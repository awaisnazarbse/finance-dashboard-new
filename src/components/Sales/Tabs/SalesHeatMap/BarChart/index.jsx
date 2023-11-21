import Loader from "@/components/utils/Loader";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("./BarChart"), {
  ssr: false,
});

const BarChartComponent = ({ duration, type }) => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery(
    ["barchart", duration, type],
    async () => {
      const res = await axios.post(
        // "http://localhost:3000/sales/barchart",
        "https://finance-dashboard-server-smoky.vercel.app/sales/barchart",
        {
          apiKey: user?.apiKey,
          duration,
          type,
        }
      );

      console.log("barchart response", res.data);

      return res.data;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-5">
      <div
        className="bg-white rounded-[10px] py-8 md:p-8 w-full  items-center flex flex-col space-y-2"
        style={{
          boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        }}
      >
        <div className="flex flex-col space-y-2 items-center">
          <span className="text-lg font-semibold capitalize">
            Bar Chart {type}
          </span>
          <span className="text-sm">Hours of day</span>
        </div>
        <div className="w-full">
          <BarChart data={data} by={type} />
        </div>
        {/* <span className="text-sm text-center">
          Hours With Highest Unit Count Between Thu 8,2023 and sunday
        </span> */}
      </div>
    </div>
  );
};

export default BarChartComponent;
