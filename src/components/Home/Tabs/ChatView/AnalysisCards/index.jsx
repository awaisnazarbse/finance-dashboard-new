import { useState } from "react";
import Card from "./Card";
import SubCard from "./SubCard";
import calculatePercentageChange from "@/utils/calculatePercentageChange";
import info from "@/constants/info";

const AnalysisCards = ({ data, statsLoading }) => {
  console.log("data in cards", data);
  const [totalRevenueActive, setTotalRevenueActive] = useState(false);
  const [takealotFeeActive, setTakealotFeeActive] = useState(false);
  const [earningActive, setEarningActive] = useState(false);
  const [expenseActive, setExpenseActive] = useState(false);
  const [returnCostActive, setReturnCostActive] = useState(false);
  const [grossProfitActive, setGrossProfitActive] = useState(false);
  const [costOfGoodActive, setCostOfGoodActive] = useState(false);
  const [netProfitActive, setNetProfitActive] = useState(false);
  const [unitSoldActive, setUnitSoldActive] = useState(false);
  const [returnTotalActive, setReturnTotalActive] = useState(false);

  return (
    <div className="p-5 flex flex-col space-y-6">
      <div className="card-container">
        <div className="flex flex-col space-y-4">
          <Card
            statsLoading={statsLoading}
            title="Total Revenue"
            iButton={info.TOTAL_REVENUE}
            value={Number(
              Number(data?.totalRevenue)
            )?.toFixed(2)}
            percentage={data?.revenueChange}
            onClick={() => {
              setTotalRevenueActive(!totalRevenueActive);
              setTakealotFeeActive(!takealotFeeActive);
              setEarningActive(!earningActive);
              setExpenseActive(!expenseActive);
              setReturnCostActive(!returnCostActive);
              setGrossProfitActive(!grossProfitActive);
              setCostOfGoodActive(!costOfGoodActive);
              setNetProfitActive(!netProfitActive);
              setUnitSoldActive(!unitSoldActive);
              setReturnTotalActive(!returnTotalActive);
            }}
          />
          {totalRevenueActive && (
            <SubCard
              title="Total Revenue"
              jhb={data?.jhbRevenue?.toFixed(2)}
              cpt={data?.cptRevenue?.toFixed(2)}
            />
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <Card
            statsLoading={statsLoading}
            title="Takealot Fee"
            iButton={info.TAKEALOT_FEE}
            value={Number(data?.takealotFee)?.toFixed(2)}
            percentage={data?.takealotFeeChange}
            onClick={() => {
              setTotalRevenueActive(!totalRevenueActive);
              setTakealotFeeActive(!takealotFeeActive);
              setEarningActive(!earningActive);
              setExpenseActive(!expenseActive);
              setReturnCostActive(!returnCostActive);
              setGrossProfitActive(!grossProfitActive);
              setCostOfGoodActive(!costOfGoodActive);
              setNetProfitActive(!netProfitActive);
              setUnitSoldActive(!unitSoldActive);
              setReturnTotalActive(!returnTotalActive);
            }}
          />
          {takealotFeeActive && (
            <SubCard
              title="Takealot Fee"
              jhb={data?.jhbTakealotFee?.toFixed(2)}
              cpt={data?.cptTakealotFee?.toFixed(2)}
            />
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <Card
            statsLoading={statsLoading}
            title="Earning"
            iButton={info.EARNING}
            value={(
              Number(data?.totalRevenue) - Number(data?.takealotFee)
            )?.toFixed(2)}
            percentage={calculatePercentageChange(
              data?.totalRevenue - data?.takealotFee,
              data?.previousTotalRevenue - data?.previousTakealotFee
            )}
            onClick={() => {
              setTotalRevenueActive(!totalRevenueActive);
              setTakealotFeeActive(!takealotFeeActive);
              setEarningActive(!earningActive);
              setExpenseActive(!expenseActive);
              setReturnCostActive(!returnCostActive);
              setGrossProfitActive(!grossProfitActive);
              setCostOfGoodActive(!costOfGoodActive);
              setNetProfitActive(!netProfitActive);
              setUnitSoldActive(!unitSoldActive);
              setReturnTotalActive(!returnTotalActive);
            }}
          />
          {earningActive && (
            <SubCard
              title="Earning"
              jhb={(data?.jhbRevenue - data?.jhbTakealotFee)?.toFixed(2)}
              cpt={(data?.cptRevenue - data?.cptTakealotFee)?.toFixed(2)}
            />
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <Card
            statsLoading={statsLoading}
            title="Expense"
            iButton={info.EXPENSE}
            value={Number(data?.totalExpenses)?.toFixed(2)}
            percentage={data?.totalExpensesChange}
            onClick={() => {
              setTotalRevenueActive(!totalRevenueActive);
              setTakealotFeeActive(!takealotFeeActive);
              setEarningActive(!earningActive);
              setExpenseActive(!expenseActive);
              setReturnCostActive(!returnCostActive);
              setGrossProfitActive(!grossProfitActive);
              setCostOfGoodActive(!costOfGoodActive);
              setNetProfitActive(!netProfitActive);
              setUnitSoldActive(!unitSoldActive);
              setReturnTotalActive(!returnTotalActive);
            }}
          />
          {expenseActive && <SubCard title="Expense" />}
        </div>
        <div className="flex flex-col space-y-4">
          <Card
            statsLoading={statsLoading}
            title="Return Cost"
            iButton={info.RETURN_COST}
            value={Number(data?.returnCost)?.toFixed(2)}
            percentage={data?.returnCostChange}
            onClick={() => {
              setTotalRevenueActive(!totalRevenueActive);
              setTakealotFeeActive(!takealotFeeActive);
              setEarningActive(!earningActive);
              setExpenseActive(!expenseActive);
              setReturnCostActive(!returnCostActive);
              setGrossProfitActive(!grossProfitActive);
              setCostOfGoodActive(!costOfGoodActive);
              setNetProfitActive(!netProfitActive);
              setUnitSoldActive(!unitSoldActive);
              setReturnTotalActive(!returnTotalActive);
            }}
          />
          {returnCostActive && (
            <SubCard
              title="Return Cost"
              jhb={data?.jhbReturnCost?.toFixed(2)}
              cpt={data?.cptReturnCost?.toFixed(2)}
            />
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <Card
            statsLoading={statsLoading}
            title="Gross Profit"
            iButton={info.GROSS_PROFIT}
            value={(
              Number(data?.totalRevenue) -
              Number(data?.takealotFee) -
              Number(data?.totalExpenses)
            )?.toFixed(2)}
            percentage={calculatePercentageChange(
              data?.totalRevenue -
                data?.takealotFee -
                Number(data?.totalExpenses),
              data?.previousTotalRevenue -
                data?.previousTakealotFee -
                Number(data?.previousTotalExpenses)
            )}
            onClick={() => {
              setTotalRevenueActive(!totalRevenueActive);
              setTakealotFeeActive(!takealotFeeActive);
              setEarningActive(!earningActive);
              setExpenseActive(!expenseActive);
              setReturnCostActive(!returnCostActive);
              setGrossProfitActive(!grossProfitActive);
              setCostOfGoodActive(!costOfGoodActive);
              setNetProfitActive(!netProfitActive);
              setUnitSoldActive(!unitSoldActive);
              setReturnTotalActive(!returnTotalActive);
            }}
          />
          {grossProfitActive && (
            <SubCard
              title="Gross Profit"
              jhb={(data?.jhbRevenue - data?.jhbTakealotFee)?.toFixed(2)}
              cpt={(data?.cptRevenue - data?.cptTakealotFee)?.toFixed(2)}
            />
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <Card
            statsLoading={statsLoading}
            title="Cost of Good"
            iButton={info.COST_OF_GOODS}
            value={Number(data?.cogs)}
            percentage="0"
            onClick={() => {
              setTotalRevenueActive(!totalRevenueActive);
              setTakealotFeeActive(!takealotFeeActive);
              setEarningActive(!earningActive);
              setExpenseActive(!expenseActive);
              setReturnCostActive(!returnCostActive);
              setGrossProfitActive(!grossProfitActive);
              setCostOfGoodActive(!costOfGoodActive);
              setNetProfitActive(!netProfitActive);
              setUnitSoldActive(!unitSoldActive);
              setReturnTotalActive(!returnTotalActive);
            }}
          />
          {costOfGoodActive && <SubCard title="Cost of Good" />}
        </div>
        <div className="flex flex-col space-y-4">
          <Card
            statsLoading={statsLoading}
            title="Net Profit"
            iButton={info.NET_PROFIT}
            value={(
              Number(data?.totalRevenue) -
              Number(data?.takealotFee) -
              Number(data?.totalExpenses) -
              Number(data?.cogs)
            )?.toFixed(2)}
            percentage={calculatePercentageChange(
              data?.totalRevenue - data?.takealotFee - data?.totalExpenses,
              data?.previousTotalRevenue -
                data?.previousTakealotFee -
                data?.previousTotalExpenses
            )}
            onClick={() => {
              setTotalRevenueActive(!totalRevenueActive);
              setTakealotFeeActive(!takealotFeeActive);
              setEarningActive(!earningActive);
              setExpenseActive(!expenseActive);
              setReturnCostActive(!returnCostActive);
              setGrossProfitActive(!grossProfitActive);
              setCostOfGoodActive(!costOfGoodActive);
              setNetProfitActive(!netProfitActive);
              setUnitSoldActive(!unitSoldActive);
              setReturnTotalActive(!returnTotalActive);
            }}
          />
          {netProfitActive && (
            <SubCard
              title="Net Profit"
              jhb={(
                data?.jhbRevenue -
                data?.jhbTakealotFee -
                data?.totalExpenses
              )?.toFixed(2)}
              cpt={(
                data?.cptRevenue -
                data?.cptTakealotFee -
                data?.totalExpenses
              )?.toFixed(2)}
            />
          )}
        </div>
        <div className="flex 2xl:hidden flex-col space-y-4">
          <Card
            statsLoading={statsLoading}
            title="Unit Sold Total"
            iButton={info.UNITS_SOLD}
            value={data?.unitSold}
            percentage={data?.unitSoldChange}
            currencySign={false}
            onClick={() => {
              setTotalRevenueActive(!totalRevenueActive);
              setTakealotFeeActive(!takealotFeeActive);
              setEarningActive(!earningActive);
              setExpenseActive(!expenseActive);
              setReturnCostActive(!returnCostActive);
              setGrossProfitActive(!grossProfitActive);
              setCostOfGoodActive(!costOfGoodActive);
              setNetProfitActive(!netProfitActive);
              setUnitSoldActive(!unitSoldActive);
              setReturnTotalActive(!returnTotalActive);
            }}
          />
          {unitSoldActive && (
            <SubCard
              title="Unit Sold Total"
              jhb={data?.jhbUnitSold}
              cpt={data?.cptUnitSold}
              currencySign={false}
            />
          )}
        </div>
        <div className="flex 2xl:hidden flex-col space-y-4">
          <Card
            statsLoading={statsLoading}
            title="Return Total"
            iButton={info.RETURN_TOTAL}
            value={data?.returnTotal}
            percentage={data?.returnTotalChange}
            currencySign={false}
            onClick={() => {
              setTotalRevenueActive(!totalRevenueActive);
              setTakealotFeeActive(!takealotFeeActive);
              setEarningActive(!earningActive);
              setExpenseActive(!expenseActive);
              setReturnCostActive(!returnCostActive);
              setGrossProfitActive(!grossProfitActive);
              setCostOfGoodActive(!costOfGoodActive);
              setNetProfitActive(!netProfitActive);
              setUnitSoldActive(!unitSoldActive);
              setReturnTotalActive(!returnTotalActive);
            }}
          />
          {returnTotalActive && (
            <SubCard
              title="Return Total"
              jhb={data?.jhbReturnTotal}
              cpt={data?.cptReturnTotal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisCards;
