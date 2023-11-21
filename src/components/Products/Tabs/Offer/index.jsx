import dynamic from "next/dynamic";
import TopBar from "./TopBar";
import { useState } from "react";

const RecordsTable = dynamic(() => import("./RecordTable"));

const Offer = ({
  offers,
  isLoading,
  userApiKeys,
  marketplace,
  setMarketplace,
  offersCogs,
  sellerNames
}) => {
  const [searchedText, setSearchedText] = useState("");

  return (
    <>
      <TopBar
        setSearchedText={setSearchedText}
        userApiKeys={userApiKeys}
        marketplace={marketplace}
        setMarketplace={setMarketplace}
      />
      <RecordsTable
        data={offers}
        searchedText={searchedText}
        isLoading={isLoading}
        marketplace={marketplace}
        offersCogs={offersCogs}
        sellerNames={sellerNames}
      />
    </>
  );
};

export default Offer;
