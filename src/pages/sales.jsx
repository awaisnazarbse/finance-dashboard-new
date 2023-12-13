import { useAuth } from "@/context/AuthContext";
import userApi from "@/lib/user";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const DashboardLayout = dynamic(() => import("../layout"));
const Orders = dynamic(() => import("../components/Sales/Tabs/Orders"));
const RemovalOrders = dynamic(() =>
  import("../components/Sales/Tabs/RemovalOrders")
);
const SalesHeatMap = dynamic(() =>
  import("../components/Sales/Tabs/SalesHeatMap")
);

const Sales = () => {
  const router = useRouter();
  const { tab } = router.query;
  const { user } = useAuth();
  const [active, setActive] = useState(tab ? tab : "orders");
  const [searchedText, setSearchedText] = useState("");
  const [marketplace, setMarketplace] = useState();
  // const tabs = ["Orders", "Returned Orders", "Sales Heat Map"];
  const tabs = [
    { title: "Orders", url: "/sales?tab=orders", key: "orders" },
    {
      title: "Returned Orders",
      url: "/sales?tab=returned-orders",
      key: "returned-orders",
    },
    {
      title: "Sales Heat Map",
      url: "/sales?tab=sales-heat-map",
      key: "sales-heat-map",
    },
  ];

  const { data: userApiKeys, isLoading } = useQuery(
    ["user-api-keys"],
    async () => {
      const res = await userApi.getActiveUserAPIKeys(user?.uid);
      console.log("userApiKeys", res);
      if (res?.length > 0) setMarketplace(res[0]?.apiKey);

      return res;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Head>
        <title>Sales</title>
      </Head>
      <DashboardLayout
        active={active}
        setActive={setActive}
        title={"Sales"}
        tabs={tabs}
      >
        <main className="bg-[#E8ECF1] flex flex-col space-y-4">
          {active === "orders" && (
            <Orders
              searchedText={searchedText}
              setSearchedText={setSearchedText}
              userApiKeys={userApiKeys}
              marketplace={marketplace}
              setMarketplace={setMarketplace}
            />
          )}
          {active === "returned-orders" && !isLoading && (
            <RemovalOrders
              searchedText={searchedText}
              setSearchedText={setSearchedText}
              userApiKeys={userApiKeys}
              marketplace={marketplace}
              setMarketplace={setMarketplace}
            />
          )}
          {active === "sales-heat-map" && <SalesHeatMap />}
        </main>
      </DashboardLayout>
    </>
  );
};

export default Sales;
