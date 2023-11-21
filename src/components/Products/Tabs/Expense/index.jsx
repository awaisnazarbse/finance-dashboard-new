import dynamic from "next/dynamic";
import TopBar from "./TopBar";
import Loader from "@/components/utils/Loader";
import { useState } from "react";

const ExpenseTable = dynamic(() => import("./ExpenseTable"));

const Expense = ({ offers, isLoading }) => {
  const [searchedText, setSearchedText] = useState("");
  return (
    <>
      <TopBar offers={offers} setSearchedText={setSearchedText} />
      {isLoading ? (
        <Loader />
      ) : (
        <ExpenseTable offers={offers} searchedText={searchedText} />
      )}
    </>
  );
};

export default Expense;
