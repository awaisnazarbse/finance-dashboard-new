import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";

const DashboardLayout = dynamic(() => import("../layout"));
const Tracking = dynamic(() => import("../components/BuyBox/Tabs/Tracking"));
const Activity = dynamic(() => import("../components/BuyBox/Tabs/Activity"));

const Buybox = ({ buyboxProducts }) => {
  const [active, setActive] = useState("Tracking");
  const tabs = ["Tracking", "Activity"];
  return (
    <>
      <Head>
        <title>Buybox Tracker</title>
      </Head>
      <DashboardLayout
        active={active}
        setActive={setActive}
        title={"Buy Box Tracker"}
        tabs={tabs}
      >
        <main className="bg-[#E8ECF1] flex flex-col space-y-4">
          {active === "Tracking" && <Tracking data={buyboxProducts} />}
          {active === "Activity" && <Activity />}
        </main>
      </DashboardLayout>
    </>
  );
};

export default Buybox;

export const getServerSideProps = async () => {
  const res = await fetch("https://finance-dashboard-server-smoky.vercel.app/api/buybox");
  const buyboxProducts = await res.json();

  return {
    props: {
      buyboxProducts,
    },
  };
};
