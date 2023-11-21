import { Checkbox } from "antd";

const AnalysisChartConfigurationModal = ({
  setConfigurations,
  configurations,
  setGraphData,
  data,
}) => {
  const options = [
    {
      label: "Sales",
      value: "Sales",
    },
    {
      label: "Units sold",
      value: "Units sold",
    },
    {
      label: "Refunds",
      value: "Refunds",
    },
    {
      label: "Promo",
      value: "Promo",
    },
    {
      label: "Orders",
      value: "Orders",
    },
    // {
    //   label: "Sellable returns",
    //   value: "Sellable returns",
    // },
    {
      label: "Refund cost",
      value: "Refund cost",
    },
    {
      label: "% Refunds",
      value: "% Refunds",
    },
    {
      label: "Takealot fee",
      value: "Takealot fee",
    },
    {
      label: "Expenses",
      value: "Expenses",
    },
    // {
    //   label: "Cost of goods",
    //   value: "Cost of goods",
    // },
    {
      label: "Gross profit",
      value: "Gross profit",
    },
    {
      label: "Margin",
      value: "Margin",
    },
    // {
    //   label: "ROI",
    //   value: "ROI",
    // },
  ];

  const onOptionsChange = (e) => {
    let newData = [];
    if (e?.includes("Units sold")) {
      newData.push({
        type: "line",
        label: "Units sold",
        data: data?.unitSold,
        yAxisID: "y1",
        pointStyle: "circle",
        pointRadius: 5,
        borderColor: "#1F4BFC",
        tension: 0.5,
        backgroundColor: "transparent",
      });
    }

    if (e?.includes("Refunds")) {
      newData.push({
        type: "line",
        label: "Refunds",
        data: data?.refunds,
        yAxisID: "y1",
        pointStyle: "circle",
        borderColor: "#FF3714",
        pointRadius: 5,
        backgroundColor: "transparent",
        tension: 0.5,
      });
    }

    if (e?.includes("% Refunds")) {
      newData.push({
        type: "line",
        label: "% Refunds",
        data: data?.refundPercent,
        yAxisID: "y1",
        pointStyle: "circle",
        borderColor: "#F59B72",
        pointRadius: 5,
        backgroundColor: "transparent",
        tension: 0.5,
      });
    }

    if (e?.includes("Orders")) {
      newData.push({
        type: "line",
        label: "Orders",
        data: data?.orders,
        yAxisID: "y1",
        pointStyle: "circle",
        borderColor: "#ACB1AD",
        pointRadius: 5,
        backgroundColor: "transparent",
        tension: 0.5,
      });
    }

    if (e?.includes("Sales")) {
      newData.push({
        type: "bar",
        data: data?.rev,
        yAxisID: "y",
        pointStyle: "rect",
        backgroundColor: "#99DA60",
        label: "Sales",
      });
    }

    if (e?.includes("Gross profit")) {
      newData.push({
        type: "bar",
        data: data?.grossProfit,
        yAxisID: "y",
        pointStyle: "rect",
        backgroundColor: "#873975",
        label: "Gross profit",
      });
    }

    if (e?.includes("Net profit")) {
      newData.push({
        type: "bar",
        label: "Net profit",
        data: data?.netProfit,
        yAxisID: "y",
        pointStyle: "rect",
        backgroundColor: "#93B5C6",
      });
    }

    if (e?.includes("Promo")) {
      newData.push({
        type: "bar",
        label: "Promo",
        data: data?.promo,
        yAxisID: "y",
        pointStyle: "rect",
        backgroundColor: "#7070DA",
      });
    }

    if (e?.includes("Margin")) {
      newData.push({
        type: "bar",
        label: "Margin",
        data: data?.margin,
        yAxisID: "y",
        pointStyle: "rect",
        backgroundColor: "#C698D1",
      });
    }

    if (e?.includes("Refund Cost")) {
      newData.push({
        type: "bar",
        label: "Refund cost",
        data: data?.refundCost,
        yAxisID: "y",
        pointStyle: "rect",
        backgroundColor: "#51C711",
      });
    }

    if (e?.includes("Takealot fee")) {
      newData.push({
        type: "bar",
        label: "Takealot fee",
        data: data?.fee,
        yAxisID: "y",
        pointStyle: "rect",
        backgroundColor: "#D4E166",
      });
    }

    if (e?.includes("Expenses")) {
      newData.push({
        type: "bar",
        label: "Expenses",
        data: data?.expenses,
        yAxisID: "y",
        pointStyle: "rect",
        backgroundColor: "#E97171",
      });
    }

    setConfigurations(e);
    setGraphData(newData);
  };

  return (
    <div
      className="flex flex-col space-y-4 bg-white shadow-lg p-4 rounded-lg w-64"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
    >
      <h1 className="text-lg font-semibold">Configuration</h1>
      <hr />
      <Checkbox.Group
        defaultValue={configurations}
        options={options}
        className="text-xl flex flex-col space-y-2"
        onChange={onOptionsChange}
      />
    </div>
  );
};

export default AnalysisChartConfigurationModal;
