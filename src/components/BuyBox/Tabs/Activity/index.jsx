import dynamic from "next/dynamic";
import TopBar from "./TopBar";
const ActivityTable = dynamic(() => import("./ActivityTable"));

const Activity = () => {
  return (
    <>
      <TopBar />
      <ActivityTable />
    </>
  );
};

export default Activity;
