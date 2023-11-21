import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import PlannerCard from "./PlannerCard";
import TopBar from "./TopBar";
import { useState } from "react";
import purchasedOrdersApi from "@/lib/purchasedOrders";
import Loader from "@/components/utils/Loader";
import suppliersApi from "@/lib/suppliers";

const RecordsTable = dynamic(() => import("./RecordTable"));

const PurchasedOrders = ({ userApiKeys }) => {
  const { user } = useAuth();
  const [searchedText, setSearchedText] = useState("");
  const [filters, setFilters] = useState({
    status: "All statuses",
    marketplace: "All marketplaces",
    suppliers: "All suppliers",
  });

  const { data: suppliers, isLoading: suppliersLoading } = useQuery(
    ["suppliers"],
    async () => {
      const response = await suppliersApi.getSuppliers(user?.uid);
      return response;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  const { data, isLoading } = useQuery(
    ["purchased_orders", filters],
    async () => {
      const res = await purchasedOrdersApi.getPurchasedOrders(
        user?.uid,
        filters
      );

      console.log("purchase orders", res);

      return res;
    }
  );

  if (suppliersLoading) {
    return <Loader />;
  }

  return (
    <>
      <TopBar
        userApiKeys={userApiKeys}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
        suppliers={suppliers}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <PlannerCard
          poCount={data?.draftData?.poCount}
          totalCost={data?.draftData?.totalCost}
          totalUnits={data?.draftData?.totalUnits}
          title={"Draft"}
          loading={isLoading}
        />
        <PlannerCard
          poCount={data?.orderedData?.poCount}
          totalCost={data?.orderedData?.totalCost}
          totalUnits={data?.orderedData?.totalUnits}
          title={"Ordered"}
          loading={isLoading}
        />
        <PlannerCard
          poCount={data?.shippedData?.poCount}
          totalCost={data?.shippedData?.totalCost}
          totalUnits={data?.shippedData?.totalUnits}
          title={"Shipped"}
          loading={isLoading}
        />
      </div>
      <RecordsTable
        data={data?.docs}
        isLoading={isLoading}
        searchedText={searchedText}
        suppliers={suppliers}
      />
    </>
  );
};

export default PurchasedOrders;
