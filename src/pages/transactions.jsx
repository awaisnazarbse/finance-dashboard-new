import TransactionsTab from "@/components/Transactions/TransactionsTab";
import Loader from "@/components/utils/Loader";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/layout";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useState } from "react";

export default function Transactions() {
  const { user } = useAuth();
  const [active, setActive] = useState("Transactions");
  const tabs = ["Transactions"];
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery(
    ["transactions", currentPage],
    async () => {
      const response = await (
        await fetch("/api/transactions", {
          body: JSON.stringify({
            apiKey: user?.apiKey,
            page: currentPage,
          }),
          method: "POST",
        })
      ).json();
      console.log("trans", response);
      return response;
    },
    {
      enabled: !!user,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

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
              pendingBalance={data?.pendingBalance}
              pageSummary={data?.data?.page_summary}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </main>
      </DashboardLayout>
    </>
  );
}
