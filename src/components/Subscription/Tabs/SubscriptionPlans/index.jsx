import dynamic from "next/dynamic";
import { useState } from "react";

const Tab = dynamic(() => import("./Tab"));
const MonthlyPlans = dynamic(() => import("./MonthlyPlans"));
const HalfYearPlans = dynamic(() => import("./HalfYearPlans"));
const AnaullPlans = dynamic(() => import("./AnuallPlans"));

const SubscriptionPlans = () => {
  const [active, setActive] = useState("Pay Monthly");
  const tabs = ["Pay Monthly", "Pay Half-Yearly", "Pay Anually"];
  return (
    <div className="">
      <Tab tabs={tabs} active={active} setActive={setActive} />
      {active === "Pay Monthly" && <MonthlyPlans />}
      {active === "Pay Half-Yearly" && <HalfYearPlans />}
      {active === "Pay Anually" && <AnaullPlans />}
    </div>
  );
};

export default SubscriptionPlans;
