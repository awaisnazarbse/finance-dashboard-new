import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  BarController,
  LineController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import dayjs from "dayjs";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Filler,
  Legend
);

const AnalysisChart = ({ overviewData, graphLabels }) => {
  const options = {
    responsive: true,
    scales: {
      // y: {
      //   ticks: {
      //     callback: (value) => `$ ${value}`,
      //   },
      // },
      y: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          callback: (value) => `R ${value}`,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          // pointStyle: {
          //   callback: (value) => console.log("pointStyle", value),
          // },
        },
      },
      // legend: {
      //   display: false,
      // },
      elements: {
        point: {
          radius: 25,
        },
      },
      datalabels: {
        display: false,
      },

      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.8)",
        yAlign: "bottom",
        padding: 15,
        displayColors: false,
        titleAlign: "center",
        bodyAlign: "center",
        bodyFont: {
          weight: "bold",
          size: 14,
        },
        titleFont: {
          weight: "normal",
          size: 12,
        },
        bodySpacing: 50,
        caretPadding: 20,
        cornerRadius: 4,
        // callbacks: {
        //   title: () => "Ave Sales:",
        //   label: (context) => `$${context.parsed.y}`,
        // },
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  console.log("graphLabels", graphLabels);

  const data = {
    labels: graphLabels,
    // datasets: [
    //   // {
    //   //   type: "bar",
    //   //   data: monthlyRev?.rev,
    //   //   yAxisID: "y",
    //   //   pointStyle: "rect",
    //   //   backgroundColor: "#067B21",
    //   //   label: "Sales",
    //   // },
    //   // {
    //   //   type: "bar",
    //   //   data: monthlyRev?.rev,
    //   //   yAxisID: "y",
    //   //   pointStyle: "rect",
    //   //   backgroundColor: "#873975",
    //   //   label: "Gross profit",
    //   // },
    //   // {
    //   //   type: "bar",
    //   //   label: "Refund cost",
    //   //   data: monthlyRev?.refundCost,
    //   //   yAxisID: "y",
    //   //   pointStyle: "rect",
    //   //   backgroundColor: "#51C711",
    //   // },
    //   // {
    //   //   type: "bar",
    //   //   label: "Net profit",
    //   //   data: monthlyRev?.refundCost,
    //   //   yAxisID: "y",
    //   //   pointStyle: "rect",
    //   //   backgroundColor: "#93B5C6",
    //   // },
    //   // {
    //   //   type: "line",
    //   //   label: "Refunds",
    //   //   data: monthlyRev?.refunds,
    //   //   yAxisID: "y1",
    //   //   pointStyle: "circle",
    //   //   borderColor: "#FF3714",
    //   //   pointRadius: 5,
    //   //   backgroundColor: "transparent",
    //   // },
    //   // {
    //   //   type: "line",
    //   //   label: "Orders",
    //   //   data: monthlyRev?.orders,
    //   //   yAxisID: "y1",
    //   //   pointStyle: "circle",
    //   //   borderColor: "#ACB1AD",
    //   //   pointRadius: 5,
    //   //   backgroundColor: "transparent",
    //   // },
    //   // {
    //   //   type: "line",
    //   //   label: "Unit sold",
    //   //   data: monthlyRev?.unitSold,
    //   //   yAxisID: "y1",
    //   //   pointStyle: "circle",
    //   //   pointRadius: 5,
    //   //   borderColor: "#1F4BFC",
    //   //   backgroundColor: "transparent",
    //   // },
    // ],
    datasets: overviewData,
  };

  return <Chart options={options} data={data} />;
};

export default AnalysisChart;
