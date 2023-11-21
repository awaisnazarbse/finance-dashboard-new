import Loader from "@/components/utils/Loader";
import { useAuth } from "@/context/AuthContext";
import offersApi from "@/lib/offers";
import userApi from "@/lib/user";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";

const DashboardLayout = dynamic(() => import("../layout"));
const Expense = dynamic(() => import("../components/Products/Tabs/Expense"));
const Offer = dynamic(() => import("../components/Products/Tabs/Offer"));
const Report = dynamic(() => import("../components/Products/Tabs/Report"));

const Products = () => {
  const [active, setActive] = useState("Offer");
  const tabs = ["Offer", "Expense", "Report"];
  const [marketplace, setMarketplace] = useState();
  const { user } = useAuth();

  const { data: userApiKeys, isLoading: keysLoading } = useQuery(
    ["user-api-keys"],
    async () => {
      const res = await userApi.getActiveUserAPIKeys(user?.uid);
      if (res?.length > 0) setMarketplace(res[0]?.apiKey);

      return res;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  const { data, isLoading } = useQuery(
    ["offers"],
    async () => {
      const res = await (
        await fetch("/api/offers", {
          body: JSON.stringify({
            apiKey: marketplace,
          }),
          method: "POST",
        })
      ).json();
      const offersCogs = await offersApi.getAllOffersCOG();
      let offersWithCogTypeConstant = [];
      await Promise.all(
        res?.map((e) => {
          if (!offersCogs?.find((cog) => cog?.offer_id === e?.offer_id)) {
            offersWithCogTypeConstant.push(e);
          }
        })
      );

      const sellerNames = [
        ...new Set(res?.map((offer) => offer?.seller_detail?.display_name)),
      ];

      console.log("seller names", sellerNames);
      return {
        offers: res,
        offersWithCogTypeConstant,
        sellerNames: sellerNames?.filter((e) => e !== undefined),
      };
    },
    {
      enabled: !!marketplace,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <DashboardLayout
        active={active}
        setActive={setActive}
        title={"Products"}
        tabs={tabs}
      >
        {isLoading || keysLoading ? (
          <Loader />
        ) : (
          <main className="bg-[#E8ECF1] flex flex-col space-y-4">
            {active === "Offer" && (
              <Offer
                offers={data?.offers}
                isLoading={isLoading}
                marketplace={marketplace}
                setMarketplace={setMarketplace}
                userApiKeys={userApiKeys}
                offersCogs={data?.offersWithCogTypeConstant}
                sellerNames={data?.sellerNames}
              />
            )}
            {active === "Expense" && (
              <Expense offers={data} isLoading={isLoading} />
            )}
            {active === "Report" && <Report />}
          </main>
        )}
      </DashboardLayout>
    </>
  );
};

export default Products;
