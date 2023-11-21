import Loader from "@/components/utils/Loader";
import AnalysisCards from "./AnalysisCards";
import RecordsTable from "./RecordsTable";
import TopBar from "./TopBar";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsTable from "../ChatView/ReveueTable/RecordsTable/ProductsTable";
import dayjs from "dayjs";

const TileView = ({ offers, userApiKeys }) => {
  const { user } = useAuth();
  const [searchedText, setSearchedText] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [marketplace, setMarketplace] = useState(
    userApiKeys?.length > 0 ? userApiKeys[0]?.apiKey : null
  );
  const [datesFilters, setDatesFilters] = useState([
    {
      title: "Today",
      start: new Date(),
      end: new Date(),
    },
    {
      title: "Yesterday",
      start: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    },
    {
      title: "This month",
      start: dayjs().startOf("month"),
      end: dayjs().endOf("month"),
    },
    {
      title: "Last month",
      start: dayjs().subtract(1, "month").startOf("month"),
      end: dayjs().subtract(1, "month").endOf("month"),
    },
  ]);
  const [startDate, setStartDate] = useState(datesFilters[0]?.start);
  const [endDate, setEndDate] = useState(datesFilters[0]?.end);
  // const [datesFilters, setDatesFilters] = useState([
  //   {
  //     title: "Month to date",
  //     start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  //     end: new Date(),
  //   },
  //   {
  //     title: "Yesterday",
  //     start: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  //     end: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  //   },
  //   {
  //     title: "This month",
  //     start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  //     end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  //   },
  //   {
  //     title: "Last month",
  //     start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
  //     end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
  //   },
  // ]);
  const [cardsData, setCardsData] = useState();
  const [activeCardTitle, setActiveCardTitle] = useState("Today");

  const { data, isLoading } = useQuery(
    ["stats", datesFilters, productTitle, marketplace],
    async () => {
      const res = await axios.post(`/api/stats`, {
        apiKey: user?.apiKey,
        dates: datesFilters,
        productTitle,
        marketplace,
        uid: user?.uid,
      });
      setActiveCardTitle(res.data[0]?.title);
      setCardsData(res.data);
      console.log("tile data", res.data);
      return res.data;
    },
    {
      enabled: !!user || !!marketplace,
      refetchOnWindowFocus: false,
    }
  );

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <div className="relative">
      <TopBar
        setCardsData={setCardsData}
        dates={datesFilters}
        setDates={setDatesFilters}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
        offers={offers}
        setProductTitle={setProductTitle}
        userApiKeys={userApiKeys}
        setMarketplace={setMarketplace}
        marketplace={marketplace}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <AnalysisCards
        data={cardsData}
        dates={datesFilters}
        setDates={setDatesFilters}
        isLoading={isLoading}
        productTitle={productTitle}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        activeCardTitle={activeCardTitle}
        setActiveCardTitle={setActiveCardTitle}
      />
      <div className="p-5">
        <RecordsTable
          dates={datesFilters}
          startDate={startDate}
          endDate={endDate}
          searchedText={searchedText}
          setSearchedText={setSearchedText}
          productTitle={productTitle}
          marketplace={marketplace}
        />
      </div>
    </div>
  );
};

export default TileView;
