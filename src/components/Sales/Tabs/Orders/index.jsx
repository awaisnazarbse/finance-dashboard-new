import dynamic from "next/dynamic";
import TopBar from "./TopBar";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";
import dayjs from "dayjs";
import RecordsTable from "./RecordTable";

const Orders = ({
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
    ["sales", marketplace, startDate, endDate],
    async () => {
      const res = await axios.post("/api/sales", {
        apiKey: user?.apiKey,
        marketplace,
        uid: user?.uid,
        duration,
        startDate,
        endDate,
      });

      return res.data;
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
        userApiKeys={userApiKeys}
        marketplace={marketplace}
        setMarketplace={setMarketplace}
        setDuration={setDuration}
        duration={duration}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <RecordsTable
        loading={isLoading}
        data={data}
        searchedText={searchedText}
      />
    </>
  );
};

export default Orders;
