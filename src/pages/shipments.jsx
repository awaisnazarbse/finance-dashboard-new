import Shipments from "@/components/Inventory/Tabs/Shipments";
import DashboardLayout from "@/layout";
import Head from "next/head";
import React from "react";

const ShipmentsPage = () => {
  return (
    <>
      <Head>
        <title>Shipments</title>
      </Head>
      <DashboardLayout
        // active={active}
        // setActive={setActive}
        title={"Shipments"}
        tabs={[]}
      >
        <main className="bg-[#E8ECF1] flex flex-col">
          <Shipments />
        </main>
      </DashboardLayout>
    </>
  );
};

export default ShipmentsPage;
