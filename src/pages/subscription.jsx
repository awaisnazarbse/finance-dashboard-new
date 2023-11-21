import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";

const DashboardLayout = dynamic(() => import("../layout"));
const SubscriptionPlans = dynamic(() =>
  import("../components/Subscription/Tabs/SubscriptionPlans")
);

const Subscription = () => {
  const [active, setActive] = useState("Subscription");
  const tabs = ["Subscription", "Payment Method", "Invoices"];
  return (
    <>
      <Head>
        <title>Subscription</title>
      </Head>
      <DashboardLayout
        active={active}
        setActive={setActive}
        title={"Subscription"}
        tabs={tabs}
      >
        <main className="bg-[#E8ECF1] flex flex-col space-y-4">
          {active === "Subscription" && <SubscriptionPlans />}
        </main>
      </DashboardLayout>
    </>
  );
};

export default Subscription;
