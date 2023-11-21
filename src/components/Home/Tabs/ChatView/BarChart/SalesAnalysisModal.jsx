import { Modal } from "antd";
import Row from "../ReveueTable/NetProfit/Row";

const SalesAnalysisModal = (props) => {
  return (
    <Modal
      title={<span className="text-lg">Account Overview</span>}
      open={props.show}
      footer={null}
      onCancel={() => {
        props.close();
      }}
    >
      <div className="flex flex-col space-y-4">
        <Row
          title="Sales"
          value={`R ${props?.data?.totalRevenue?.toFixed(2)}`}
          type="header"
        />
        <Row
          title="Units Sold"
          value={`${props?.data?.unitSold}`}
          type="body"
        />
        <Row
          title="Takealot Fee"
          value={`R ${props?.data?.noOfSales?.toFixed(2)}`}
          type="body"
        />
        <Row
          title="Gross Profit"
          value={`R ${(props?.data?.totalRevenue - props?.data?.fee)?.toFixed(
            2
          )}`}
          type="body"
        />
        <Row
          title="Net Profit"
          value={`R ${(
            props?.data?.totalRevenue -
            props?.data?.fee -
            props?.data?.totalExpenses
          )?.toFixed(2)}`}
          type="header"
        />
      </div>
    </Modal>
  );
};

export default SalesAnalysisModal;
