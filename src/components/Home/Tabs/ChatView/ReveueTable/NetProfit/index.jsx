import { useState } from "react";
import Row from "./Row";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import FilterModal from "./FilterModal";
import dayjs from "dayjs";
import formatDateRange from "@/utils/formatDateRange";
import info from "@/constants/info";
import { Button } from "antd";
import DetailsModal from "./DetailsModal";

const NetProfit = ({
  productTitle,
  startDate1,
  endDate1,
  duration,
  marketplace,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");

  const { user } = useAuth();

  const { data: newData, isLoading } = useQuery(
    ["sales-stats", productTitle, startDate1, endDate1, duration, marketplace],
    async () => {
      const res = await (
        await fetch("/api/sales/stats", {
          body: JSON.stringify({
            apiKey: user?.apiKey,
            startDate: startDate1,
            endDate: endDate1,
            productTitle,
            duration,
            marketplace,
            uid: user?.uid,
          }),
          method: "POST",
        })
      ).json();
      console.log("stats", res);
      setData(res);
      return res;
    },
    {
      enabled: !!user || !!marketplace,
      refetchOnWindowFocus: false,
    }
  );

  const renderFeeChild = (data) => {
    return (
      <div className="flex flex-col">
        <Row
          title="Success fee"
          value={`R ${Number(data?.successFee)?.toFixed(2)}`}
          type="body"
          isLoading={isLoading}
          info="Success fee"
        />
        <Row
          title="Fulfillment fee"
          value={`R ${Number(data?.fulfillmentFee)?.toFixed(2)}`}
          type="body"
          isLoading={isLoading}
          info="Fulfillment fee"
        />
        <Row
          title="Courier collection fee"
          value={`R ${Number(data?.courierCollectionFee)?.toFixed(2)}`}
          type="body"
          isLoading={isLoading}
          info="Courier collection fee"
        />
        <Row
          title="Auto ibt fee"
          value={`R ${Number(data?.autoIbtFee)?.toFixed(2)}`}
          type="body"
          isLoading={isLoading}
          info="Auto ibt fee"
        />
      </div>
    );
  };
  const renderExpenseChild = (data) => {
    return (
      <div className="flex flex-col">
        {Object.entries(data?.expenseCategories).map(([category, amount]) => (
          <Row
            title={category}
            value={`R ${Number(amount)?.toFixed(2)}`}
            type="body"
            isLoading={isLoading}
            info={category}
          />
        ))}
        {/* <Row
          title="Success fee"
          value={`R ${data?.successFee?.toFixed(2)}`}
          type="body"
          isLoading={isLoading}
          info="Success fee"
        />
        <Row
          title="Fulfillment fee"
          value={`R ${data?.fulfillmentFee?.toFixed(2)}`}
          type="body"
          isLoading={isLoading}
          info="Fulfillment fee"
        />
        <Row
          title="Courier collection fee"
          value={`R ${data?.courierCollectionFee?.toFixed(2)}`}
          type="body"
          isLoading={isLoading}
          info="Courier collection fee"
        />
        <Row
          title="Auto ibt fee"
          value={`R ${data?.autoIbtFee?.toFixed(2)}`}
          type="body"
          isLoading={isLoading}
          info="Auto ibt fee"
        /> */}
      </div>
    );
  };

  return (
    <div
      className="w-full md:w-[30%] flex flex-col space-y-6 bg-white p-4 rounded-[10px]"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex items-center justify-center bg-[#F7B614] p-2 px-5 rounded-[5px]"
          style={{
            boxShadow: "rgba(247,182,20, 0.25) 0px 5px 15px 0px",
          }}
        >
          <span className="text-white text-sm">
            {formatDateRange(startDate1, endDate1)}
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <Row
          title="Sales"
          value={`R ${Number(data?.sales)?.toFixed(2)}`}
          type="header"
          isLoading={isLoading}
          info="Total Sales Revenue"
        />
        <hr />
        <Row
          title="Units"
          value={data?.units}
          type="body"
          isLoading={isLoading}
          info="Number of Units ordered"
        />
        <hr />
        <Row
          title="Promo"
          value={`R ${Number(data?.promo)?.toFixed(2)}`}
          type="body"
          isLoading={isLoading}
          info="Total sales in promotions. All discounts that you give to the buyers"
        />
        <hr />
        <Row
          title="Units Returned"
          value={data?.totalReturnedUnits}
          type="body"
          isLoading={isLoading}
          info="Total sales in promotions. All discounts that you give to the buyers"
        />
        <hr />
        <Row
          title="Return Item Cost"
          value={`R ${Number(data?.returnCost)?.toFixed(2)}`}
          type="body"
          isLoading={isLoading}
          info="Adjusted due to returns. Contains sales price paid back to customer and Takealot fees to Seller."
        />
        <hr />
        <Row
          title="Takealot Fees"
          value={`R ${Number(data?.fee)?.toFixed(2)}`}
          type="body"
          expandable={true}
          isLoading={isLoading}
          info={info.TAKEALOT_FEE}
          children={renderFeeChild(data)}
        />
        <hr />
        <Row
          title="Cost Of Goods"
          value={`R ${data?.cogs}`}
          type="body"
          info="= Total cost of goods sold including buying price, shipping and import fees. This sum increases when orders are shipped, decreases when goods are returned by customers and increases again if they are non-sellable stock."
        />
        <hr />
        <Row
          title="Gross Profit"
          value={`R ${(Number(data?.sales) - Number(data?.fee))?.toFixed(2)}`}
          type="body"
          isLoading={isLoading}
          info="Gross Profit"
        />
        <hr />
        <Row
          title="Expenses"
          value={`R ${Number(data?.totalExpenses)?.toFixed(2)}`}
          type="body"
          expandable={true}
          isLoading={isLoading}
          info="Other Expenses (Monthly, daily) Eg- Office, warehouse, subscription, tools etc. an be entered manually under expense tab in products."
          children={data?.expenseCategories ? renderExpenseChild(data) : null}
        />
        <hr />
        <Row
          title="Net Profit"
          value={`R ${(
            Number(data?.sales) -
            Number(data?.fee) -
            Number(data?.totalExpenses)
          )?.toFixed(2)}`}
          type="header"
          isLoading={isLoading}
          info="Gross profit minus all other expenses"
        />
        <div className="hidden 2xl:block">
          <hr />
          <Row
            title="Estimated Payout"
            value={`R ${(Number(data?.sales) - Number(data?.fee))?.toFixed(2)}`}
            type="body"
            isLoading={isLoading}
            info="Estimated payout is the difference between your revenues and Takealot charges. It is estimated because we calculate it, it is not based on the real payouts. Since there are expenses that are only considered at the account level (e.g. subscription, storage etc.), the amount of profit or estimated payout per account is usually less than the total amount of profits or payouts per products. Also, Takealot has a different formula for calculating your payouts, in addition, it always leaves some amounts in reserve for your balance."
          />
          <hr />
          <Row
            title="% Returns"
            value={
              data?.units !== 0
                ? (
                    (Number(data?.totalReturnedUnits) / Number(data?.units)) *
                    100
                  ).toFixed(2)
                : 0
            }
            type="body"
            isLoading={isLoading}
            info="Calculated as follows Number of returned unit/Number of sold units *100"
          />
          {/* <hr />
          <Row
            title="Sellable Returns"
            value="-"
            type="body"
            isLoading={isLoading}
            info="Sellable customer return / all customer returns *100"
          /> */}
          <hr />
          <Row
            title="Margin"
            value={`${
              data?.sales !== 0
                ? (
                    ((Number(data?.sales) -
                      Number(data?.fee) -
                      Number(data?.totalExpenses) -
                      Number(data?.cogs)) /
                      Number(data?.sales)) *
                    100
                  )?.toFixed(2)
                : 0
            }%`}
            type="body"
            isLoading={isLoading}
            info="Profitability of your Business = Net profit /Sales * 100"
          />
          <hr />
          <Row
            title="ROI"
            value={`${
              data?.sales
                ? (
                    ((Number(data?.sales) -
                      Number(data?.fee) -
                      Number(data?.totalExpenses)) /
                      Number(data?.cogs)) *
                    100
                  )?.toFixed(2)
                : 0
            }%`}
            type="body"
            isLoading={isLoading}
            info="Net profit/ COG * 100 (ROI is calculated after all fees."
          />
          <hr />
        </div>
        <Button
          className="block 2xl:hidden"
          type="link"
          onClick={() => setModal(true)}
        >
          More
        </Button>
      </div>
      {modal && (
        <DetailsModal
          show={modal}
          close={() => {
            setModal(false);
          }}
          data={data}
        />
      )}
    </div>
  );
};

export default NetProfit;
