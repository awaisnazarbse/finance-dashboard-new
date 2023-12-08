import TransactionsTab from "@/components/Transactions/TransactionsTab";
import Loader from "@/components/utils/Loader";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/layout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

export default function Transactions() {
  const { user } = useAuth();
  const [active, setActive] = useState("Transactions");
  const tabs = ["Transactions"];
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [duration, setDuration] = useState("Last 6 Months");
  const { data, isLoading } = useQuery(
    ["transactions", currentPage, startDate, endDate, duration],
    async () => {
      const response = await (
        await fetch("/api/transactions", {
          body: JSON.stringify({
            apiKey: user?.apiKey,
            page: currentPage,
            duration,
            startDate,
            endDate,
          }),
          method: "POST",
        })
      ).json();
      console.log("trans", response);
      return response;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  const { data: balances, isLoading: balancesLoading } = useQuery(
    ["balances"],
    async () => {
      const res = await axios.post("/api/transactions/balance", {
        apiKey: user?.apiKey,
      });
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <DashboardLayout
        active={active}
        setActive={setActive}
        title={"Transactions"}
        tabs={tabs}
      >
        <main className="bg-[#E8ECF1] flex flex-col">
          {active === "Transactions" && (
            <TransactionsTab
              data={data?.data?.transactions}
              disbursment={data?.disbursment}
              pendingBalance={data?.pendingBalance}
              pageSummary={data?.data?.page_summary}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setDuration={setDuration}
              loading={isLoading}
              balancesLoading={balancesLoading}
              balances={balances}
              graphData={data?.groupedDisbursment}
            />
          )}
        </main>
      </DashboardLayout>
    </>
  );
}
