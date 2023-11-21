import dynamic from "next/dynamic";
import TopBar from "../Orders/TopBar";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import dayjs from "dayjs";
import Card from "./Card";
import getAllSales from "@/utils/getAllSales";

const RecordsTable = dynamic(() => import("./RecordTable"));

const RemovalOrders = ({
  searchedText,
  setSearchedText,
  userApiKeys,
  marketplace,
  setMarketplace,
}) => {
  const { user } = useAuth();
  const [duration, setDuration] = useState("Today");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const { data, isLoading } = useQuery(
    ["sales-removals", marketplace, startDate, endDate],
    async () => {
      const res = await axios.post("/api/sales/returns", {
        apiKey: user?.apiKey,
        uid: user?.uid,
        marketplace,
      });
      const resData = res.data;
      let filtered = [];
      const cardsData = {
        totalReturns: filtered.length,
        sellableReturns: 0,
        removalReturns: 0,
      };
      await resData?.forEach((e) => {
        if (
          (dayjs(
            dayjs.unix(Number(e?.return_date)).format("DD MMM YYYY")
          ).isBefore(dayjs(endDate).format("DD MMM YYYY")) &&
            dayjs(
              dayjs.unix(Number(e?.return_date)).format("DD MMM YYYY")
            ).isAfter(dayjs(startDate).format("DD MMM YYYY"))) ||
          dayjs(
            dayjs.unix(Number(e?.return_date)).format("DD MMM YYYY")
          ).isSame(dayjs(startDate).format("DD MMM YYYY")) ||
          dayjs(
            dayjs.unix(Number(e?.return_date)).format("DD MMM YYYY")
          ).isSame(dayjs(endDate).format("DD MMM YYYY"))
        ) {
          filtered?.push(e);
          if (
            e?.seller_return_outcome?.description
              ?.toLowerCase()
              ?.includes("removal order")
          ) {
            cardsData.removalReturns += e?.qty;
          } else if (
            e?.seller_return_outcome?.description
              ?.toLowerCase()
              ?.includes("sellable stock")
          ) {
            cardsData.sellableReturns += e?.qty;
          }
        }
      });

      // const sales = await getAllSales(
      //   dayjs(startDate).format("YYYY-MM-DD"),
      //   dayjs(endDate).format("YYYY-MM-DD"),
      //   marketplace,
      //   true
      // );
      // const salesRes = await axios.post("/api/sales", {
      //   apiKey: user?.apiKey,
      //   marketplace,
      //   uid: user?.uid,
      //   duration,
      //   startDate,
      //   endDate,
      // });

      // const orderIds = filtered?.map((e) => e?.order_id);
      // console.log("order ids", orderIds);

      // let final = [];

      // salesRes.data?.forEach((e) => {
      //   if (orderIds.includes(e?.order_id)) {
      //     const order = filtered.find((o) => o?.order_id === e?.order_id)
      //     final.push({ ...order, dc: e?.dc });
      //   }
      // });

      cardsData.totalReturns = filtered?.length;

      return { data: filtered, cardsData };
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <TopBar
        setSearchedText={setSearchedText}
        userApiKeys={userApiKeys}
        marketplace={marketplace}
        setMarketplace={setMarketplace}
        duration={duration}
        setDuration={setDuration}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <Card
          amount={data?.cardsData?.totalReturns}
          title={"Total Returns"}
          loading={isLoading}
        />
        <Card
          amount={data?.cardsData?.sellableReturns}
          title={"Sellable Returns"}
          loading={isLoading}
        />
        <Card
          amount={data?.cardsData?.removalReturns}
          title={"Removal Returns"}
          loading={isLoading}
        />
      </div>
      <RecordsTable
        loading={isLoading}
        data={data?.data}
        searchedText={searchedText}
      />
    </>
  );
};

export default RemovalOrders;
