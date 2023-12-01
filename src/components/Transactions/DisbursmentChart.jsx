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
import { Bar, Chart, Line } from "react-chartjs-2";
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

const DisbursmentChart = ({ overviewData, graphLabels }) => {
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

  return (
    <Line
      options={options}
      data={{
        datasets: [{ label: "Disbursment", data: overviewData }],
        labels: graphLabels,
      }}
    />
  );
};

export default DisbursmentChart;
