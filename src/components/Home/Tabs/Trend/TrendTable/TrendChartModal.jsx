import { Modal } from "antd";
import TrendChart from "./TrendChart";

const TrendChartModal = (props) => {
  console.log("prop.offers", props);

  return (
    <Modal
      title={"Trend Chart"}
      open={props.show}
      footer={null}
      onCancel={() => {
        props.close();
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <TrendChart
          data={props?.data}
          labels={props?.labels}
          dotSize={props?.dotSize}
          xAxis={true}
          yAxis={true}
          active={props?.active}
        />
      </div>
    </Modal>
  );
};

export default TrendChartModal;
