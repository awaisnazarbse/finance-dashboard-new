import dynamic from "next/dynamic";
import TopBar from "./TopBar";
const TrackingTable = dynamic(() => import("./TrackingTable"));

const Tracking = ({data}) => {
  return (
    <>
      <TopBar />
      <TrackingTable data={data} />
    </>
  );
};

export default Tracking;
