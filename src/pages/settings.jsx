import Loader from "@/components/utils/Loader";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";

const DashboardLayout = dynamic(() => import("../layout"));
const SettingsContent = dynamic(() =>
  import("../components/Settings/SettingsContent")
);

const Settings = () => {
  const { user } = useAuth();

  const { data, isLoading } = useQuery(
    ["settings"],
    async () => {
      const res = await axios.post("/api/settings", {
        // apiKey: user?.apiKey,
        uid: user?.uid,
      });

      console.log("res.data", res.data);

      return res.data;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <DashboardLayout title={"Settings"}>
        <main className="bg-[#E8ECF1] flex flex-col space-y-4">
          <SettingsContent data={data} />
        </main>
      </DashboardLayout>
    </>
  );
};

export default Settings;
