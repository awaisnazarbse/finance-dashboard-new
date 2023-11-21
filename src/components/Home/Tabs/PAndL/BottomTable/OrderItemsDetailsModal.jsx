import { Modal, Select } from "antd";
import info from "@/constants/info";
import Row from "../../ChatView/ReveueTable/NetProfit/Row";

const OrderItemsDetailsModal = (props) => {
  // console.log("props.data", props.data);

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
      title={<span className="text-lg">{props?.data?.product_title}</span>}
      open={props.show}
      footer={null}
      onCancel={() => {
        if (props?.data) {
          props?.setData(null);
        }
        props.close();
      }}
    >
      <div className="flex flex-col space-y-1">
        <Row
          title="Sales"
          value={`R ${props?.data?.selling_price?.toFixed(2)}`}
          type="header"
          info={info.TOTAL_REVENUE}
        />
        <hr />
        <Row
          title="Units"
          value={`${props?.data?.quantity}`}
          type="body"
          info={info.UNITS_SOLD}
        />
        <hr />
        <Row
          title="Promo"
          value={`R ${
            props?.data?.promotion
              ? props?.data?.selling_price?.toFixed(2)
              : (0).toFixed(2)
          }`}
          type="body"
          info={info.PROMO}
        />
        <hr />
        <Row
          title="Return Item Cost"
          value={`-`}
          type="body"
          info={info.RETURN_COST}
        />
        <hr />
        <Row
          title="Takealot Fees"
          value={`R ${props?.data?.total_fee?.toFixed(2)}`}
          type="body"
          info={info.TAKEALOT_FEE}
          expandable={true}
          children={renderFeeChild(props?.data)}
        />
        <hr />
        <Row
          title="Cost Of Goods"
          value={`R ${Number(props?.data?.cog * props?.data?.quantity).toFixed(
            2
          )}`}
          type="body"
          info={info.COST_OF_GOODS}
        />
        <hr />
        <Row
          title="Gross Profit"
          value={`R ${(
            props?.data?.selling_price - props?.data?.total_fee
          )?.toFixed(2)}`}
          type="body"
          info={info.GROSS_PROFIT}
        />
        <hr />
        <Row
          title="Expenses"
          value={`-`}
          type="body"
          info={info.EXPENSE}
          children={
            props?.data?.expenseCategories
              ? renderExpenseChild(props?.data)
              : null
          }
          expandable={true}
        />
        <hr />
        <Row
          title="Net Profit"
          value={`R ${(
            props?.data?.selling_price - props?.data?.total_fee
          )?.toFixed(2)}`}
          type="header"
          info={info.NET_PROFIT}
        />
        <hr />
        <Row
          title="Estimated Payout"
          value={`R ${(
            props?.data?.selling_price - props?.data?.total_fee
          )?.toFixed(2)}`}
          type="body"
          info={info.ESTIMATED_PAYOUT}
        />
        <hr />
        <Row
          title="% Refund"
          value={`0.00%`}
          type="body"
          info={info.PERCENT_RETURN}
        />
        {/* <hr />
        <Row
          title="Sellable Returns"
          value="-"
          type="body"
          info={info.SELLABLE_RETURN}
        /> */}
        <hr />
        <Row
          title="Margin"
          value={`${(
            ((props?.data?.selling_price - props?.data?.total_fee) /
              props?.data?.selling_price) *
            100
          )?.toFixed(2)}%`}
          type="body"
          info={info.MARGIN}
        />
        <hr />
        <Row
          title="ROI"
          value={`${Number(
            ((props?.data?.selling_price * props?.data?.quantity -
              props?.data?.total_fee) /
              props?.data?.cog) *
              100
          ).toFixed(2)}%`}
          type="body"
          info={info.ROI}
        />
        <hr />
      </div>
    </Modal>
  );
};

export default OrderItemsDetailsModal;