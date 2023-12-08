import React from "react";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// const data = [
//   [10, 20, 30, 40, 50, 60, 70], // 12 AM
//   [15, 25, 35, 45, 55, 65, 75], // 1 AM
//   [20, 30, 40, 50, 60, 70, 80], // 2 AM
//   [25, 35, 45, 55, 65, 75, 85], // 3 AM
//   [30, 40, 50, 60, 70, 80, 90], // 4 AM
//   [35, 45, 55, 65, 75, 85, 95], // 5 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
//   [40, 50, 60, 70, 80, 90, 100], // 6 AM
// ];

const byUnitRange = [
  // {
  //   from: 0,
  //   to: 0.8,
  //   color: "#FFBB5C",
  // },
  // {
  //   from: 0.9,
  //   to: 1.2,
  //   color: "#FF9B50",
  // },
  {
    from: 0,
    to: 0.5,
    color: "#FFBB5C",
  },
  {
    from: 0.6,
    to: 1,
    color: "#FF9B50",
  },
  {
    from: 1.1,
    to: 1.5,
    color: "#C63D2F",
  },
  {
    from: 1.6,
    to: 2,
    color: "#952323",
  },
];

const bySalesRange = [
  {
    from: 0,
    to: 200,
    color: "#FFBB5C",
  },
  {
    from: 201,
    to: 400,
    color: "#FF9B50",
  },
  {
    from: 401,
    to: 600,
    color: "#E25E3E",
  },
  {
    from: 601,
    to: 800,
    color: "#C63D2F",
  },
  {
    from: 801,
    to: 1000,
    color: "#952323",
  },
  {
    from: 1001,
    to: 200000,
    name: ">= 1001",
    color: "#660707",
  },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const HeatmapChart = ({ data, by }) => {
  const series = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ].map((day, index) => {
    return {
      name: day,
      data: data[index],
    };
  });

  const options = {
    chart: {
      type: "heatmap",
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          // ranges: [
          //   {
          //     from: 0,
          //     to: 2,
          //     color: "#FFBB5C",
          //   },
          //   {
          //     from: 3,
          //     to: 5,
          //     color: "#FF9B50",
          //   },
          //   {
          //     from: 6,
          //     to: 8,
          //     color: "#E25E3E",
          //   },
          //   {
          //     from: 9,
          //     to: 11,
          //     color: "#C63D2F",
          //   },
          //   {
          //     from: 12,
          //     to: 14,
          //     color: "#952323",
          //   },
          // ],
          ranges: by === "By units" ? byUnitRange : bySalesRange,
        },
      },
    },
    xaxis: {
      categories: days,
      position: "top", // Display x-axis labels on top
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "left",
    },
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <ApexChart
        options={options}
        series={series}
        type="heatmap"
        height={500}
      />
    </div>
  );
};

export default HeatmapChart;
