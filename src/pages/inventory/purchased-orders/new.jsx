import NewPurchaseOrderForm from "@/components/Inventory/Tabs/PurchasedOrders/NewPurchaseOrderForm";
import NewPurchaseOrderTabs from "@/components/Inventory/Tabs/PurchasedOrders/NewPurchaseOrderTabs";
import StatusIcon from "@/components/Inventory/Tabs/PurchasedOrders/StatusIcon";
import Loader from "@/components/utils/Loader";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/layout";
import offersApi from "@/lib/offers";
import purchasedOrdersApi from "@/lib/purchasedOrders";
import suppliersApi from "@/lib/suppliers";
import userApi from "@/lib/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { serverTimestamp } from "firebase/firestore";
import Head from "next/head";
import { useState } from "react";

const NewPurchasedOrders = () => {
  const { user } = useAuth();
  const [active, setActive] = useState("Draft");
  const [saveModal, setSaveModal] = useState(false);
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

  const saveMutation = useMutation(
    ["purchase_orders"],
    async (data) => {
      await purchasedOrdersApi.addPurchasedOrder(data);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        setProductsData([]);
        setShipmentsData([]);
        setTransportationCostData([]);
        setBasicData({});
        message.success("Purchase order saved!");
        queryClient.invalidateQueries(["purchase_orders"]);
        setSaveModal(false);
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
      refetchOnWindowFocus: false,
    }
  );

  const handleStatusChange = (status) => {
    setBasicData({ ...basicData, status: status });
    setActive(status);
  };

  const handleSave = (saveSettings) => {
    console.log("save settings", saveSettings);
    console.log("productsData", productsData);

    if (productsData?.length <= 0 || basicData.date === null) {
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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ...saveSettings,
      };
      console.log("data to save", data);
      saveMutation.mutate(data);
      if (saveSettings?.newCOG) {
        if (productsData?.length > 0) {
          productsData?.map(async (e) => {
            let newCog = null;
            if (saveSettings?.previousBatchReminder) {
              // productsData?.forEach((e) => {
              let totalStockInHand = 0;
              e?.product?.leadtime_stock?.forEach((stock) => {
                totalStockInHand += stock?.quantity_available;
              });
              const prevCog = await offersApi.getOfferCOGWithType(
                e?.product?.offer_id
              );
              let prevStock =
                totalStockInHand + e?.product?.stock_at_takealot_total;
              let newStock = e?.unitsOrdered;
              let prevStockValue = prevStock * prevCog.cog;
              let newStockValue = newStock * e?.totalCostPerUnit;
              let totalStock = prevStock + newStock;
              let totalStockValue = prevStockValue + newStockValue;
              newCog = totalStockValue / totalStock;
              // });
            }
            if (saveSettings?.newBatchStartDate) {
              await offersApi.updateCOG(
                e?.product?.offer_id,
                newCog ? newCog : e?.totalCostPerUnit,
                saveSettings?.newBatchStartDate
              );
            } else {
              await offersApi.updateCOG(
                e?.product?.offer_id,
                newCog ? newCog : e?.totalCostPerUnit
              );
            }
          });
        }
      }
    }
  };

  if (isLoading || keysLoading || offersLoading || shipmentsLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>New Purchase Order</title>
      </Head>
      <DashboardLayout
        active={""}
        setActive={() => null}
        title={"New Purchase Order"}
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
            saveModal={saveModal}
            setSaveModal={setSaveModal}
          />
        </main>
      </DashboardLayout>
    </>
  );
};

export default NewPurchasedOrders;
