import APIModal from "@/components/SignIn/APIModal";
import Loader from "@/components/utils/Loader";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import userApi from "@/lib/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DashboardLayout = dynamic(() => import("../layout"));
const ChatView = dynamic(() => import("../components/Home/Tabs/ChatView"));
const PAndL = dynamic(() => import("../components/Home/Tabs/PAndL"));
const TileView = dynamic(() => import("../components/Home/Tabs/TileView"));
const Trend = dynamic(() => import("../components/Home/Tabs/Trend"));

export default function Home() {
  const router = useRouter();
  const { tab } = router.query;
  const [overallStats, setOverallStats] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [todaySalesData, setTodaySalesData] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  const [duration, setDuration] = useState("Today");
  const [aggregatedBy, setAggregatedBy] = useState("Hourly");
  const [productTitle, setProductTitle] = useState("");
  const [marketplace, setMarketplace] = useState();
  const [active, setActive] = useState(tab ? tab : "chart-view");
  // const tabs = ["Chart View", "Tile View", "P&L", "Trend"];
  const tabs = [
    { title: "Chart View", url: "/?tab=chart-view", key: "chart-view" },
    {
      title: "Tile View",
      url: "/?tab=tile-view",
      key: "tile-view",
    },
    { title: "P&L", url: "/?tab=pl", key: "pl" },
    { title: "Trend", url: "/?tab=trend", key: "trend" },
  ];

  const { user } = useAuth();

  const [apiModal, setApiModal] = useState(false);

  const hasApiKey = async () => {
    const apiRef = collection(db, "takealot-apis");
    const q = query(apiRef, where("user", "==", user?.uid));
    const docs = await getDocs(q);
    if (docs.size <= 0) {
      setApiModal(true);
    }
  };

  useEffect(() => {
    if (user) {
      hasApiKey();
    }
  }, [user]);

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



  const { data: offers, isLoading: offersLoading } = useQuery(
    ["offers", marketplace],
    async () => {
      const res = await axios.post("/api/offers/lite", {
        apiKey: marketplace,
      });

      return res.data;
    },
    {
      enabled: !!marketplace,
      refetchOnWindowFocus: false,
    }
  );

  if (offersLoading || keysLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <DashboardLayout
        active={active}
        setActive={setActive}
        title={"Dashboard"}
        tabs={tabs}
      >
        <main className="bg-[#E8ECF1] flex flex-col space-y-4">
          {active === "chart-view" && (
            <ChatView
              // setOverallStats={setOverallStats}
              // stats={stats}
              setTodaySalesData={setTodaySalesData}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              duration={duration}
              setDuration={setDuration}
              aggregatedBy={aggregatedBy}
              setAggregatedBy={setAggregatedBy}
              offers={offers}
              setProductTitle={setProductTitle}
              productTitle={productTitle}
              offersLoading={offersLoading}
              userApiKeys={userApiKeys}
              marketplace={marketplace}
              setMarketplace={setMarketplace}
            />
          )}
          {active === "tile-view" && (
            <TileView offers={offers} userApiKeys={userApiKeys} />
          )}
          {active === "pl" && (
            <PAndL offers={offers} userApiKeys={userApiKeys} />
          )}
          {active === "trend" && <Trend userApiKeys={userApiKeys} />}
        </main>
      </DashboardLayout>
      {apiModal && (
        <APIModal
          show={apiModal}
          close={() => {
            setApiModal(false);
          }}
          showMessage={true}
        />
      )}
    </>
  );
}

// export const getServerSideProps = async () => {
//   const res = await axios.get("http://localhost:3005/api/offers");

//   return { props: { allOffers: res } };
// };
