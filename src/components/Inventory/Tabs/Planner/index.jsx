import Card from "./Card";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import PlannerCard from "./PlannerCard";
import TopBar from "./TopBar";
import { useState } from "react";
import purchasedOrdersApi from "@/lib/purchasedOrders";
import offersApi from "@/lib/offers";
import calculateUnitsOrderedByOfferId from "@/utils/calculateUnitsOrderedByOfferId";

const RecordsTable = dynamic(() => import("./RecordTable"));

const Planner = ({ userApiKeys }) => {
  const { user } = useAuth();
  const [searchedText, setSearchedText] = useState("");
  const { data: plannerData, isLoading } = useQuery(
    ["inventory_planner"],
    async () => {
      const res = await axios.post("/api/inventory/planner", {
        apiKey: user?.apiKey,
      });

      const purchaseOrders = await purchasedOrdersApi.getPurchasedOrderByStatus(
        ["Ordered", "Shipped"]
      );

      console.log("offers in planner", res.data);
      const finalData = [];
      await Promise.all(
        res.data?.map(async (e) => {
          const cog = await offersApi.getOfferCOGByOfferId(Number(e?.offer_id));
          if (cog) {
            finalData.push({ ...e, cog });
          } else {
            finalData.push({ ...e, cog: 0 });
          }
        })
      );
      const costOfGood = {
        stock: 0,
        reserved: 0,
        ordered: 0,
      };
      const potentialSales = {
        stock: 0,
        reserved: 0,
        ordered: 0,
      };
      const potentialProfit = {
        stock: 0,
        reserved: 0,
        ordered: 0,
      };
      await Promise.all(
        finalData?.map(async (e) => {
          const unitsOrdered = await calculateUnitsOrderedByOfferId(
            e?.offer_id,
            purchaseOrders
          );
          let totalStockInHand = 0;
          const stockOnWay = e?.total_stock_on_way;
          e?.leadtime_stock?.forEach((e) => {
            totalStockInHand += e?.quantity_available;
          });
          const newStock = e?.stock_at_takealot_total + totalStockInHand;
          costOfGood.stock += newStock * e?.cog;
          costOfGood.reserved += stockOnWay * e?.cog;
          costOfGood.ordered += unitsOrdered * e?.cog;

          potentialSales.stock += newStock * e?.selling_price;
          potentialSales.reserved += stockOnWay * e?.selling_price;
          potentialSales.ordered += unitsOrdered * e?.selling_price;
        })
      );

      const manufacturingAndLogistics =
        await offersApi.getManufacturingAndLogistics();
      const supplierOrderSettings = await offersApi.getSupplierOrderSettings();
      return {
        data: finalData,
        purchaseOrders,
        manufacturingAndLogistics,
        supplierOrderSettings,
        matrics: {
          costOfGood,
          potentialSales,
          potentialProfit,
        },
      };
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );
  // const { data: cardData, isLoading: cardDataLoading } = useQuery(
  //   ["inventory_planner_matric"],
  //   async () => {
  //     const res = await axios.post("/api/inventory/planner/metrics", {
  //       apiKey: user?.apiKey,
  //     });

  //     console.log("metrics in planner", res.data);

  //     return res.data;
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled: !!user,
  //   }
  // );
  const data = [
    {
      title: "Cost of Goods",
      bg: "rgba(253, 154, 139, 0.40)",
    },
    {
      title: "Potential Sales",
      bg: "#B7D7F6",
    },
    {
      title: "Potential Profit",
      bg: "#B7E8E8",
    },
  ];
  return (
    <>
      <TopBar
        userApiKeys={userApiKeys}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        {/* {data?.map((e, i) => (
          <Card data={e} key={i} bg={e?.bg} />
        ))} */}
        <Card
          data={plannerData?.matrics?.costOfGood}
          title={"Cost of Goods"}
          bg={"rgba(253, 154, 139, 0.40)"}
          loading={isLoading}
        />
        <Card
          data={plannerData?.matrics?.potentialSales}
          title={"Potential Sales"}
          bg={"#B7D7F6"}
          loading={isLoading}
        />
        <Card
          data={plannerData?.matrics?.potentialProfit}
          title={"Potential Profit"}
          bg={"#B7E8E8"}
          loading={isLoading}
        />
        {/* <PlannerCard
          amount={
            cardData?.stockInHand + cardData?.stockInDC + cardData?.stockOnWay
          }
          title={"Total Stock Value"}
          loading={cardDataLoading}
        />
        <PlannerCard
          amount={cardData?.stockInDC}
          title={"Stock In DCs"}
          loading={cardDataLoading}
        />
        <PlannerCard
          amount={cardData?.stockOnWay}
          title={"Stock On The Way"}
          loading={cardDataLoading}
        />
        <PlannerCard
          amount={cardData?.stockInHand}
          title={"Stock On Hand"}
          loading={cardDataLoading}
        /> */}
      </div>
      <RecordsTable
        data={plannerData?.data}
        isLoading={isLoading}
        searchedText={searchedText}
        purchaseOrders={plannerData?.purchaseOrders}
        manufacturingAndLogistics={plannerData?.manufacturingAndLogistics}
        supplierOrderSettings={plannerData?.supplierOrderSettings}
      />
    </>
  );
};

export default Planner;
