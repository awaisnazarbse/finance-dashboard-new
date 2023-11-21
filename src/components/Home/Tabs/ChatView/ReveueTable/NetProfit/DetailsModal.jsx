import { Modal, Select } from "antd";
import info from "@/constants/info";
import Row from "../NetProfit/Row";

const DetailsModal = (props) => {
  console.log("props.data", props.data);
  const renderFeeChild = (data) => {
    return (
      <div className="flex flex-col">
        <Row
          title="Success fee"
          value={`R ${Number(data?.successFee)?.toFixed(2)}`}
          type="body"
          info="Success fee"
        />
        <Row
          title="Fulfillment fee"
          value={`R ${Number(data?.fulfillmentFee)?.toFixed(2)}`}
          type="body"
          info="Fulfillment fee"
        />
        <Row
          title="Courier collection fee"
          value={`R ${Number(data?.courierCollectionFee)?.toFixed(2)}`}
          type="body"
          info="Courier collection fee"
        />
        <Row
          title="Auto ibt fee"
          value={`R ${Number(data?.autoIbtFee)?.toFixed(2)}`}
          type="body"
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
            info={category}
          />
        ))}
      </div>
    );
  };

  return (
    <Modal
      title={"Overview"}
      open={props.show}
      footer={null}
      onCancel={() => {
        props.close();
      }}
    >
      <div className="flex flex-col space-y-1">
        <Row
          title="Sales"
          value={`R ${Number(props?.data?.sales)?.toFixed(2)}`}
          type="header"
          info="Total Sales Revenue"
        />
        <hr />
        <Row
          title="Units"
          value={props?.data?.units}
          type="body"
          info="Number of Units ordered"
        />
        <hr />
        <Row
          title="Promo"
          value={`R ${Number(props?.data?.promo)?.toFixed(2)}`}
          type="body"
          info="Total sales in promotions. All discounts that you give to the buyers"
        />
        <hr />
        <Row
          title="Return Item Cost"
          value={`R ${Number(props?.data?.returnCost)?.toFixed(2)}`}
          type="body"
          info="Adjusted due to returns. Contains sales price paid back to customer and Takealot fees to Seller."
        />
        <hr />
        <Row
          title="Takealot Fees"
          value={`R ${Number(props?.data?.fee)?.toFixed(2)}`}
          type="body"
          expandable={true}
          info={info.TAKEALOT_FEE}
          children={renderFeeChild(props?.data)}
        />
        <hr />
        <Row
          title="Cost Of Goods"
          value={`R ${props?.data?.cogs}`}
          type="body"
          info="= Total cost of goods sold including buying price, shipping and import fees. This sum increases when orders are shipped, decreases when goods are returned by customers and increases again if they are non-sellable stock."
        />
        <hr />
        <Row
          title="Gross Profit"
          value={`R ${(Number(props?.data?.sales) - Number(props?.data?.fee))?.toFixed(
            2
          )}`}
          type="body"
          info="Gross Profit"
        />
        <hr />
        <Row
          title="Expenses"
          value={`R ${Number(props?.data?.totalExpenses)?.toFixed(2)}`}
          type="body"
          expandable={true}
          info="Other Expenses (Monthly, daily) Eg- Office, warehouse, subscription, tools etc. an be entered manually under expense tab in products."
          children={
            props?.data?.expenseCategories
              ? renderExpenseChild(props?.data)
              : null
          }
        />
        <hr />
        <Row
          title="Net Profit"
          value={`R ${(
            Number(props?.data?.sales) -
            Number(props?.data?.fee) -
            Number(props?.data?.totalExpenses)
          )?.toFixed(2)}`}
          type="header"
          info="Gross profit minus all other expenses"
        />
        <hr />
        <Row
          title="Estimated Payout"
          value={`R ${(
            Number(props?.data?.sales) - Number(props?.data?.fee)
          )?.toFixed(2)}`}
          type="body"
          info="Estimated payout is the difference between your revenues and Takealot charges. It is estimated because we calculate it, it is not based on the real payouts. Since there are expenses that are only considered at the account level (e.g. subscription, storage etc.), the amount of profit or estimated payout per account is usually less than the total amount of profits or payouts per products. Also, Takealot has a different formula for calculating your payouts, in addition, it always leaves some amounts in reserve for your balance."
        />
        <hr />
        <Row
          title="% Returns"
          value={
            props?.data?.units !== 0
              ? (
                  (Number(props?.data?.totalReturnedUnits) /
                    Number(props?.data?.units)) *
                  100
                ).toFixed(2)
              : 0
          }
          type="body"
          info="Calculated as follows Number of returned unit/Number of sold units *100"
        />
        <hr />
        <Row
          title="Sellable Returns"
          value="-"
          type="body"
          info="Sellable customer return / all customer returns *100"
        />
        <hr />
        <Row
          title="Margin"
          value={`${
            props?.data?.sales !== 0
              ? (
                  ((Number(props?.data?.sales) -
                    Number(props?.data?.fee) -
                    Number(props?.data?.totalExpenses) -
                    Number(props?.data?.cogs)) /
                    Number(props?.data?.sales)) *
                  100
                )?.toFixed(2)
              : 0
          }%`}
          type="body"
          info="Profitability of your Business = Net profit /Sales * 100"
        />
        <hr />
        <Row
          title="ROI"
          value={`${
            props?.data?.sales
              ? (
                  ((Number(props?.data?.sales) -
                    Number(props?.data?.fee) -
                    Number(props?.data?.totalExpenses)) /
                    Number(props?.data?.sales)) *
                  100
                )?.toFixed(2)
              : 0
          }%`}
          type="body"
          info="Net profit/ COG * 100 (ROI is calculated after all fees."
        />
        <hr />
      </div>
    </Modal>
  );
};

export default DetailsModal;
