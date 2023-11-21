import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PerformanceChart = ({ performance }) => {
  const data = {
    labels: ["totalRevenue", "takealotFee", "earning", "unitSold"],
    datasets: [
      {
        label: "# of Votes",
        data: performance,
        backgroundColor: ["#FD9A8B", "#B7AEF8", "#C1725A", "#1569BD"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        formatter: (value, ctx) => {
          let percentage = 0;
          const dataset = ctx?.chart?.data?.datasets[0];
          if (dataset?.data) {
            const total = dataset?.data?.reduce(
              (acc, currentValue) => acc + currentValue
            );
            percentage = ((value * 100) / total)?.toFixed(2) + "%";
          }
          return percentage;
        },
        color: "black",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default PerformanceChart;
