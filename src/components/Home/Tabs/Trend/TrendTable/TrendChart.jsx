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
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const TrendChart = ({
  dotSize,
  data,
  labels,
  xAxis = false,
  yAxis = false,
  active,
}) => {
  const options = {
    responsive: true,
    cartesion: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: xAxis ? true : false, // Hide x-axis
      },
      y: {
        display: yAxis ? true : false, // Hide y-axis
        type: "linear",
        position: "left",
        ticks: {
          callback: (value) =>
            `${active === "Sales" ? "R" : ""} ${value}${
              active === "Returns" ? "%" : ""
            }`,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 25, // Adjust the radius to increase or decrease the dot size
        },
      },
      datalabels: {
        display: false,
      },

      tooltip: {
        enabled: true,
        backgroundColor: "#1569BD",
        yAlign: "bottom",
        padding: 15,
        displayColors: false,
        titleAlign: "center",
        bodyAlign: "center",
        bodyFont: {
          weight: "bold",
          size: 18,
        },
        titleFont: {
          weight: "normal",
          size: 12,
        },
        bodySpacing: 50,
        caretPadding: 20,
        cornerRadius: 4,
        callbacks: {
          // title: () => "Ave Sales:",
          label: (context) =>
            `${active === "Sales" ? "R" : ""} ${context.parsed.y}${
              active === "Returns" ? "%" : ""
            }`,
        },
      },
    },
  };

  // const labels = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];

  const settings = {
    labels,
    datasets: [
      {
        fill: true,
        data: data,
        backgroundColor: (context) => {
          if (!context.chart.chartArea) {
            return;
          }
          const {
            ctx,
            data,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0, "rgba(253, 154, 139, 0)");
          gradientBg.addColorStop(1, "rgba(253, 154, 139, 0)");
          return gradientBg;
        },
        borderColor: "#1569BD",
        borderWidth: 2,
        dot: "#1569BD",
        pointBackgroundColor: "#1569BD",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#1569BD",
        pointHoverBorderWidth: 2,
        pointHoverBorderWidth: 4,
        pointRadius: dotSize,
        lineTension: 0.6,
      },
    ],
  };

  return (
    <Line
      options={options}
      data={settings}
      style={{ height: xAxis ? 300 : 50 }}
    />
  );
};

export default TrendChart;
