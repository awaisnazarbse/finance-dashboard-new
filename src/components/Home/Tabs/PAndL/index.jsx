import dynamic from "next/dynamic";
import TopTable from "./TopTable";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Loader from "@/components/utils/Loader";

const BottomTable = dynamic(() => import("./BottomTable"));

const PAndL = ({ offers, userApiKeys }) => {
  const { user } = useAuth();
  const [searchedText, setSearchedText] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [marketplace, setMarketplace] = useState(
    userApiKeys?.length > 0 ? userApiKeys[0]?.apiKey : null
  );

  const [duration, setDuration] = useState("Last 3 Months");
  const [bottomTableDuration, setBottomTableDuration] =
    useState("Last 3 Months");
  const [dates, setDates] = useState([
    dayjs().subtract(3, "months").startOf("month"),
    dayjs(),
  ]);
  const [bottomTableDates, setBottomTableDates] = useState([
    dayjs().subtract(3, "months").startOf("month"),
    dayjs(),
  ]);

  const [cols, setCols] = useState([]);

  const [aggregationDates, setAggregationDates] = useState(
    Array.from({ length: 12 }, (_, i) => {
      const startDate = new Date(new Date().getFullYear(), i, 1);
      const endDate = new Date(new Date().getFullYear(), i + 1, 0);
      return { startDate, endDate };
    })
  );

  const { data, isLoading } = useQuery(
    ["pl", dates, productTitle],
    async () => {
      setLoading(true);
      // console.log("profit loss calling");
      const res = await axios.post("/api/sales/profitloss", {
        apiKey: marketplace,
        dates,
        duration,
        productTitle,
      });
      // const res = await fetch("/api/sales/profitloss", {
      //   body: JSON.stringify({
      //     apiKey: user?.apiKey,
      //     dates,
      //     duration,
      //     productTitle,
      //   }),
      // });
      // console.log("profit loss data..", res);
      console.log("res of pl", res);
      setCols(res.data?.cols);
      setLoading(false);
      return res.data?.result;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <TopBar
        setSearchedText={setSearchedText}
        dates={dates}
        setDates={setDates}
        setDuration={setDuration}
        setProductTitle={setProductTitle}
        offers={offers}
        userApiKeys={userApiKeys}
        setMarketplace={setMarketplace}
        marketplace={marketplace}
        setBottomTableDates={setBottomTableDates}
        setBottomTableDuration={setBottomTableDuration}
      />
      <TopTable
        dates={dates}
        data={data}
        isLoading={isLoading}
        loading={loading}
        cols={cols}
        duration={duration}
        setDates={setDates}
        setBottomTableDates={setBottomTableDates}
        setBottomTableDuration={setBottomTableDuration}
        bottomTableDates={bottomTableDates}
      />
      <div className="p-5">
        <BottomTable
          searchedText={searchedText}
          dates={dates}
          aggregationDates={aggregationDates}
          duration={duration}
          productTitle={productTitle}
          marketplace={marketplace}
          userApiKeys={userApiKeys}
          bottomTableDates={bottomTableDates}
          bottomTableDuration={bottomTableDuration}
        />
      </div>
    </>
  );
};

export default PAndL;
