import { useState } from "react";
import dynamic from "next/dynamic";

const Notification = dynamic(() => import("./Notification"));
const ReportTypes = dynamic(() => import("./ReportTypes"));

const Report = () => {
  const [showNotification, setShowNotification] = useState(true);
  return (
    <>
      {showNotification && (
        <Notification setShowNotification={setShowNotification} />
      )}
      <ReportTypes />
    </>
  );
};

export default Report;
