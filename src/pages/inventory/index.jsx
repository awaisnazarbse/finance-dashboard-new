import PurchasedOrders from "@/components/Inventory/Tabs/PurchasedOrders";
import Shipments from "@/components/Inventory/Tabs/Shipments";
import Suppliers from "@/components/Inventory/Tabs/Suppliers";
import Loader from "@/components/utils/Loader";
import { useAuth } from "@/context/AuthContext";
import userApi from "@/lib/user";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const DashboardLayout = dynamic(() => import("../../layout"));
const Planner = dynamic(() => import("../../components/Inventory/Tabs/Planner"));

const Inventory = () => {
  const router = useRouter();
  const { tab } = router.query;
  const [active, setActive] = useState(tab ? tab : "Planner");
  const tabs = ["Planner", "Purchased Orders", "Suppliers"];
  const { user } = useAuth();

  const { data: userApiKeys, isLoading: keysLoading } = useQuery(
    ["user-api-keys"],
    async () => {
      const res = await userApi.getUserAPIKeys(user?.uid);
      return res;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  if (keysLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Inventory</title>
      </Head>
      <DashboardLayout
        active={active}
        setActive={setActive}
        title={"Inventory"}
        tabs={tabs}
      >
        <main className="bg-[#E8ECF1] flex flex-col space-y-4">
          {active === "Planner" && <Planner userApiKeys={userApiKeys} />}
          {active === "Purchased Orders" && (
            <PurchasedOrders userApiKeys={userApiKeys} />
          )}
          {/* {active === "Shipments" && <Shipments />} */}
          {active === "Suppliers" && <Suppliers />}
        </main>
      </DashboardLayout>
    </>
  );
};

export default Inventory;
