import { Modal } from "antd";
import Row from "../../ChatView/ReveueTable/NetProfit/Row";
import formatDateRange from "@/utils/formatDateRange";
import info from "@/constants/info";

const MoreOptionModal = (props) => {
  console.log("data in more", props);
  const renderFeeChild = (data) => {
    return (
      <div className="flex flex-col">
        {Number(data?.successFee) !== 0 && (
          <Row
            title="Success fee"
            value={`R ${Number(data?.successFee)?.toFixed(2)}`}
            type="body"
            info="Success fee"
          />
        )}
        {Number(data?.fulfillmentFee) !== 0 && (
          <Row
            title="Fulfillment fee"
            value={`R ${Number(data?.fulfillmentFee)?.toFixed(2)}`}
            type="body"
            info="Fulfillment fee"
          />
        )}
        {Number(data?.courierCollectionFee) !== 0 && (
          <Row
            title="Courier collection fee"
            value={`R ${Number(data?.courierCollectionFee)?.toFixed(2)}`}
            type="body"
            info="Courier collection fee"
          />
        )}
        {Number(data?.autoIbtFee) !== 0 && (
          <Row
            title="Auto ibt fee"
            value={`R ${Number(data?.autoIbtFee)?.toFixed(2)}`}
            type="body"
            info="Auto ibt fee"
          />
        )}
        {Number(data?.manualReversalFee) !== 0 && (
          <Row
            title="Manual Reversal"
            value={`R ${Number(data?.manualReversalFee)?.toFixed(2)}`}
            type="body"
            info="Manual Reversal"
          />
        )}
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
        {Number(data?.storageFee) !== 0 && (
          <Row
            title="Storage Fee Charge"
            value={`R ${Number(data?.storageFee)?.toFixed(2)}`}
            type="body"
            info="Storage Fee Charge"
          />
        )}
        {Number(data?.adCreditFee) !== 0 && (
          <Row
            title="Ad Credit Purchase"
            value={`R ${Number(data?.adCreditFee)?.toFixed(2)}`}
            type="body"
            info="Ad Credit Purchase"
          />
        )}
        {Number(data?.subscriptionFee) !== 0 && (
          <Row
            title="Subscription Fee Charge"
            value={`R ${Number(data?.subscriptionFee)?.toFixed(2)}`}
            type="body"
            info="Subscription Fee Charge"
          />
        )}
      </div>
    );
  };

  return (
    <Modal
      title={
        <div className="flex flex-col">
          <span className="text-lg font-medium">{props?.data?.title}</span>
          <span className="text-sm font-light">
            {formatDateRange(props?.data?.startDate, props?.data?.endDate)}
          </span>
        </div>
      }
      open={props.show}
      footer={null}
      onCancel={() => {
        props.close();
      }}
    >
      <div className="flex flex-col space-y-1 mt-5">
        <Row
          title="Sales"
          value={`R ${props?.data?.earning?.toFixed(2)}`}
          type="header"
          info={info.TOTAL_REVENUE}
        />
        <hr />
        <Row
          title="Units"
          value={`${props?.data?.unitSold}`}
          type="body"
          info={info.UNITS_SOLD}
        />
        <hr />
        <Row
          title="Promo"
          value={`R ${props?.data?.promo?.toFixed(2)}`}
          type="body"
          info={info.PROMO}
        />
        <hr />
        <Row
          title="Refunds"
          value={`${props?.data?.refunded}`}
          type="body"
          info={info.RETURN_TOTAL}
        />
        <hr />
        <Row
          title="Refund cost"
          value={`R ${props?.data?.refundCost?.toFixed(2)}`}
          type="body"
          info={info.RETURN_COST}
        />
        <hr />
        <Row
          title="Takealot fee"
          value={`R ${props?.data?.fee?.toFixed(2)}`}
          type="body"
          expandable={true}
          info={info.TAKEALOT_FEE}
          children={renderFeeChild(props?.data)}
        />
        <hr />
        <Row
          title="Cost of goods"
          value={`R ${props?.data?.cogs?.toFixed(2)}`}
          type="body"
          info={info.COST_OF_GOODS}
        />
        <hr />
        <Row
          title="Gross profit"
          value={`R ${Number(
            props?.data?.earning - props?.data?.refundCost - props?.data?.fee
          ).toFixed(2)}`}
          type="body"
          info={info.COST_OF_GOODS}
        />
        <hr />
        <Row
          title="Expense"
          value={`R ${
            props?.data?.expenses
              ? Number(props?.data?.expenses).toFixed(2)
              : "-"
          }`}
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
            props?.data?.earning -
            props?.data?.refundCost -
            props?.data?.fee -
            props?.data?.expenses
          )?.toFixed(2)}`}
          type="header"
          info={info.NET_PROFIT}
        />
        <hr />
        <Row
          title="Estimated payout"
          value={`R ${(props?.data?.earning - props?.data?.fee).toFixed(2)}`}
          type="body"
          info={info.ESTIMATED_PAYOUT}
        />
        <hr />
        <Row
          title="% Refunds"
          value={`${(
            (props?.data?.refunded / props?.data?.unitSold) *
            100
          ).toFixed(2)}%`}
          type="body"
          info={info.PERCENT_RETURN}
        />
        <hr />
        <Row
          title="Margin"
          value={`${Number(
            ((props?.data?.earning -
              props?.data?.refundCost -
              props?.data?.fee -
              props?.data?.expenses) /
              props?.data?.earning) *
              100
          ).toFixed(2)}%`}
          type="body"
          info={info.MARGIN}
        />
        <hr />
        <Row
          title="ROI"
          value={`${Number(
            ((props?.data?.earning -
              props?.data?.refundCost -
              props?.data?.fee -
              props?.data?.expenses) /
              props?.data?.cogs) *
              100
          ).toFixed(2)}%`}
          type="body"
          info={info.ROI}
        />
      </div>
    </Modal>
  );
};

export default MoreOptionModal;
