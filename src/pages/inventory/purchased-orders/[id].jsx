import NewPurchaseOrderForm from "@/components/Inventory/Tabs/PurchasedOrders/NewPurchaseOrderForm";
import NewPurchaseOrderTabs from "@/components/Inventory/Tabs/PurchasedOrders/NewPurchaseOrderTabs";
import StatusIcon from "@/components/Inventory/Tabs/PurchasedOrders/StatusIcon";
import Loader from "@/components/utils/Loader";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/layout";
import purchasedOrdersApi from "@/lib/purchasedOrders";
import suppliersApi from "@/lib/suppliers";
import userApi from "@/lib/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { serverTimestamp } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const PurchasedOrder = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [active, setActive] = useState("Draft");
  const [basicData, setBasicData] = useState({
    date: null,
    status: "Draft",
    estimatedArrivalDate: null,
    supplier: null,
    marketplace: null,
    carrier: "",
    trackingNumber: "",
    comments: "",
  });
  const [productsData, setProductsData] = useState([]);
  const [transportationCostData, setTransportationCostData] = useState([]);
  const [shipmentsData, setShipmentsData] = useState([]);
  const queryClient = useQueryClient();

  const { data, isLoading: orderLoading } = useQuery(
    ["purchased-orders", id],
    async () => {
      const response = await purchasedOrdersApi.getPurchasedOrder(id);
      console.log("order is here", response);
      const estimatedArrivalDate = response?.estimatedArrivalDate?.toDate();
      const date = response?.date?.toDate();
      setBasicData({
        date: dayjs(date),
        status: response?.status,
        estimatedArrivalDate: dayjs(estimatedArrivalDate),
        supplier: response?.supplier,
        marketplace: response?.marketplace,
        carrier: response?.carrier,
        trackingNumber: response?.trackingNumber,
        comments: response?.comments,
      });
      setProductsData(response?.products);
      setTransportationCostData(response?.transportationCost);
      setShipmentsData(response?.shipments);
      return response;
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  );

  const saveMutation = useMutation(
    ["purchase_orders"],
    async (data) => {
      await purchasedOrdersApi.updatePurchasedOrder(id, data);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        message.success("Purchase order updated!");
        queryClient.invalidateQueries(["purchase_orders"]);
      },
    }
  );

  const { data: suppliers, isLoading } = useQuery(
    ["suppliers"],
    async () => {
      const response = await suppliersApi.getSuppliers(user?.uid);
      console.log("suppliers", response.data);
      return response;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

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

  const { data: offers, isLoading: offersLoading } = useQuery(
    ["offers"],
    async () => {
      const res = await axios.post("/api/offers/lite", {
        apiKey: user?.apiKey,
      });

      console.log("offers lite", res.data);

      return res.data;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
      // initialData: allOffers,
    }
  );

  const { data: shipments, isLoading: shipmentsLoading } = useQuery(
    ["shipments"],
    async () => {
      const response = await axios.post("/api/inventory/shipments", {
        apiKey: user?.apiKey,
      });
      console.log("shipments", response.data);
      return response.data?.shipments;
    },
    {
      enabled: !!user,
    }
  );

  const handleStatusChange = (status) => {
    setBasicData({ ...basicData, status: status });
    setActive(status);
  };

  const handleSave = (saveSettings) => {
    if (
      productsData?.length <= 0 ||
      Object.values(basicData).some((value) => value === null || value === "")
    ) {
      message.error("Please provide details!");
    } else {
      const data = {
        ...basicData,
        date: dayjs(basicData?.date).toDate(),
        estimatedArrivalDate: dayjs(basicData?.estimatedArrivalDate).toDate(),
        products: productsData,
        transportationCost: transportationCostData,
        shipments: shipmentsData,
        user: user?.uid,
        updatedAt: serverTimestamp(),
        ...saveSettings
      };
      saveMutation.mutate(data);
    }
  };

  if (
    isLoading ||
    keysLoading ||
    offersLoading ||
    shipmentsLoading ||
    orderLoading
  ) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Edit Purchase Order</title>
      </Head>
      <DashboardLayout
        active={""}
        setActive={() => null}
        title={"Edit Purchase Order"}
        tabs={[]}
      >
        <main className="bg-[#E8ECF1] flex flex-col relative">
          <div className="flex items-center justify-center space-x-4 p-5 bg-white">
            <StatusIcon
              icon={"/icons/status/draft.svg"}
              onclick={() => handleStatusChange("Draft")}
              selectedStatus={basicData?.status}
              title={"Draft"}
            />
            <div
              className="h-[.18rem] w-40 bg-[#F5F5F5]"
              style={{
                background:
                  basicData?.status === "Ordered" ||
                  basicData?.status === "Shipped" ||
                  basicData?.status === "Closed"
                    ? "black"
                    : "#F5F5F5",
              }}
            ></div>
            <StatusIcon
              icon={"/icons/status/ordered.svg"}
              onclick={() => handleStatusChange("Ordered")}
              selectedStatus={basicData?.status}
              title={"Ordered"}
            />
            <div
              className="h-[.18rem] w-40 bg-[#F5F5F5]"
              style={{
                background:
                  basicData?.status === "Shipped" ||
                  basicData?.status === "Closed"
                    ? "black"
                    : "#F5F5F5",
              }}
            ></div>
            <StatusIcon
              icon={"/icons/status/shipped.svg"}
              onclick={() => handleStatusChange("Shipped")}
              selectedStatus={basicData?.status}
              title={"Shipped"}
            />
            <div
              className="h-[.18rem] w-40 bg-[#F5F5F5]"
              style={{
                background:
                  basicData?.status === "Closed" ? "black" : "#F5F5F5",
              }}
            ></div>
            <StatusIcon
              icon={"/icons/status/closed.svg"}
              onclick={() => handleStatusChange("Closed")}
              selectedStatus={basicData?.status}
              title={"Closed"}
            />
          </div>
          <div className="p-5 bg-white">
            <NewPurchaseOrderForm
              basicData={basicData}
              setBasicData={setBasicData}
              suppliers={suppliers}
              userApiKeys={userApiKeys}
            />
          </div>
          <NewPurchaseOrderTabs
            offers={offers}
            shipments={shipments}
            productsData={productsData}
            setProductsData={setProductsData}
            shipmentsData={shipmentsData}
            setShipmentsData={setShipmentsData}
            transportationCostData={transportationCostData}
            setTransportationCostData={setTransportationCostData}
            onSave={handleSave}
            submitting={saveMutation.isLoading}
            saveBtnDisabled={
              productsData?.length <= 0 ||
              Object.values(basicData).some(
                (value) => value === null || value === ""
              )
            }
            status={basicData.status}
          />
        </main>
      </DashboardLayout>
    </>
  );
};

export default PurchasedOrder;
