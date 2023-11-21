import { Table } from "antd";
import Image from "next/image";
import TrendChart from "./TrendChart";
import dayjs from "dayjs";
import TrendChartModal from "./TrendChartModal";

const Last3MonthsTrend = ({
  data,
  currencySign = false,
  dates,
  isLoading,
  cols,
  percentSign = false,
  showTrendChart,
  setShowTrendChart,
  trendChartData,
  setTrendChartData,
  // columns,
  searchedText,
  active,
}) => {
  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Products</span>
        </div>
      ),
      dataIndex: "product",
      fixed: "left",
      render: (_, record) => (
        <div className="flex items-center">
          {/* <Image alt="alt text" src={"/images/product-img.png"} width={60} height={60} /> */}
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] text-black line-clamp-2">
              {record?.product}
            </span>
            {/* <span className="text-[11px] text-[#1569BD]">
              ${record?.product?.productPrice}
            </span> */}
          </div>
        </div>
      ),
      width: "350px",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.product)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Chart</span>
        </div>
      ),
      dataIndex: "curPolicy",
      render: (_, record) => (
        <div
          className="flex items-center w-[7rem] h-[5rem]"
          onClick={() => {
            setTrendChartData({
              data: Object.values(record?.sales).reverse(),
              labels: Object.keys(record?.sales).reverse(),
              dotSize: 2,
            });
            setShowTrendChart(true);
          }}
        >
          <TrendChart
            data={Object.values(record?.sales).reverse()}
            labels={Object.keys(record?.sales).reverse()}
            dotSize={2}
            active={active}
          />
        </div>
      ),
    },
   
    ...cols?.map((title, index) => ({
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">{title}</span>
        </div>
      ),
      dataIndex: `sales[${index}].sales`, // Assuming your data structure matches this
      key: `sales[${index}].sales`,
      sorter: (a, b) => a?.sales[title] - b?.sales[title],
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""} {record?.sales[title]}
              {percentSign ? "%" : ""}
            </span>
            <span
              className="text-[11px] text-[#FF380D]"
              style={{
                color: record?.percentage[title] < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {record?.percentage[title]
                ? record?.percentage[title] > 0
                  ? "+" + record?.percentage[title]?.toFixed(2)
                  : record?.percentage[title]?.toFixed(2)
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    })),
    
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[0]}</span>
    //     </div>
    //   ),
    //   dataIndex: "complaint",
    //   sorter: (a, b) => a?.sales[cols[0]] - b?.sales[cols[0]],
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex flex-col items-center">
    //         <span className="text-[11px] text-black">
    //           {currencySign ? "R " : ""} {record?.sales[cols[0]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#FF380D]"
    //           style={{
    //             color: record?.percentage[cols[0]] < 0 ? "#FF380D" : "#15CAB8",
    //           }}
    //         >
    //           {record?.percentage[cols[0]]
    //             ? record?.percentage[cols[0]] > 0
    //               ? "+" + record?.percentage[cols[0]]?.toFixed(2)
    //               : record?.percentage[cols[0]]?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[1]}</span>
    //     </div>
    //   ),
    //   dataIndex: "nonComplaint",
    //   sorter: (a, b) => a?.sales[cols[1]] - b?.sales[cols[1]],
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex-col flex items-center">
    //         <span className="text-[11px] text-black">
    //           {currencySign ? "R " : ""}
    //           {record?.sales[cols[1]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#15CAB8]"
    //           style={{
    //             color: record?.percentage[cols[1]] < 0 ? "#FF380D" : "#15CAB8",
    //           }}
    //         >
    //           {record?.percentage[cols[1]]
    //             ? record?.percentage[cols[1]] > 0
    //               ? "+" + record?.percentage[cols[1]]?.toFixed(2)
    //               : record?.percentage[cols[1]]?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[2]}</span>
    //     </div>
    //   ),
    //   sorter: (a, b) => a?.sales[cols[2]] - b?.sales[cols[2]],
    //   dataIndex: "spf",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex-col flex items-center">
    //         <span
    //           className="text-[11px]"
    //           //   style={{
    //           //     color: record?.ads < 0 ? "#FF380D" : "#15CAB8",
    //           //   }}
    //         >
    //           {currencySign ? "R " : ""} {record?.sales[cols[2]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#FF380D]"
    //           style={{
    //             color: record?.percentage[cols[2]] < 0 ? "#FF380D" : "#15CAB8",
    //           }}
    //         >
    //           {record?.percentage[cols[2]]
    //             ? record?.percentage[cols[2]] > 0
    //               ? "+" + record?.percentage[cols[2]]?.toFixed(2)
    //               : record?.percentage[cols[2]]?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[3]}</span>
    //     </div>
    //   ),
    //   dataIndex: "dkim",
    //   sorter: (a, b) => a?.sales[cols[3]] - b?.sales[cols[3]],
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex flex-col items-center">
    //         <span className="text-[11px] text-black">
    //           {currencySign ? "R " : ""} {record?.sales[cols[3]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#15CAB8]"
    //           style={{
    //             color: record?.percentage[cols[3]] < 0 ? "#FF380D" : "#15CAB8",
    //           }}
    //         >
    //           {record?.percentage[cols[3]]
    //             ? record?.percentage[cols[3]] > 0
    //               ? "+" + record?.percentage[cols[3]]?.toFixed(2)
    //               : record?.percentage[cols[3]]?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[4]}</span>
    //     </div>
    //   ),
    //   dataIndex: "accepted",
    //   sorter: (a, b) => a?.sales[cols[4]] - b?.sales[cols[4]],
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex flex-col items-center">
    //         <span className="text-[11px] text-black">
    //           {currencySign ? "R " : ""}
    //           {record?.sales[cols[4]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#FF380D]"
    //           style={{
    //             color: record?.percentage[cols[4]] < 0 ? "#FF380D" : "#15CAB8",
    //           }}
    //         >
    //           {record?.percentage[cols[4]]
    //             ? record?.percentage[cols[4]] > 0
    //               ? "+" + record?.percentage[cols[4]]?.toFixed(2)
    //               : record?.percentage[cols[4]]?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[5]}</span>
    //     </div>
    //   ),
    //   sorter: (a, b) => a?.sales[cols[5]] - b?.sales[cols[5]],
    //   dataIndex: "quarantine",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex flex-col items-center">
    //         <span className="text-[11px] text-black">
    //           {currencySign ? "R " : ""} {record?.sales[cols[5]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#15CAB8]"
    //           style={{
    //             color: record?.percentage[cols[5]] < 0 ? "#FF380D" : "#15CAB8",
    //           }}
    //         >
    //           {record?.percentage[cols[5]]
    //             ? record?.percentage[cols[5]] > 0
    //               ? "+" + record?.percentage[cols[5]]?.toFixed(2)
    //               : record?.percentage[cols[5]]?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[6]}</span>
    //     </div>
    //   ),
    //   sorter: (a, b) => a?.sales[cols[6]] - b?.sales[cols[6]],
    //   dataIndex: "rejected",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex flex-col items-center">
    //         <span className="text-[11px] text-black">
    //           {currencySign ? "R " : ""} {record?.sales[cols[6]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#FF380D]"
    //           style={{
    //             color: record?.percentage[cols[6]] < 0 ? "#FF380D" : "#15CAB8",
    //           }}
    //         >
    //           {record?.percentage[cols[6]]
    //             ? record?.percentage[cols[6]] > 0
    //               ? "+" + record?.percentage[cols[6]]?.toFixed(2)
    //               : record?.percentage[cols[6]]?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[7]}</span>
    //     </div>
    //   ),
    //   sorter: (a, b) => a?.sales[cols[7]] - b?.sales[cols[7]],
    //   dataIndex: "rejected",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex flex-col items-center">
    //         <span className="text-[11px] text-black">
    //           {currencySign ? "R " : ""} {record?.sales[cols[7]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#15CAB8]"
    //           style={{
    //             color: record?.percentage[cols[7]] < 0 ? "#FF380D" : "#15CAB8",
    //           }}
    //         >
    //           {record?.percentage[cols[7]]
    //             ? record?.percentage[cols[7]] > 0
    //               ? "+" + record?.percentage[cols[7]]?.toFixed(2)
    //               : record?.percentage[cols[7]]?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[8]}</span>
    //     </div>
    //   ),
    //   sorter: (a, b) => a?.sales[cols[8]] - b?.sales[cols[8]],
    //   dataIndex: "rejected",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex flex-col items-center">
    //         <span className="text-[11px] text-black">
    //           {currencySign ? "R " : ""} {record?.sales[cols[8]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#15CAB8]"
    //           style={{
    //             color: record?.percentage[cols[8]] < 0 ? "#FF380D" : "#15CAB8",
    //           }}
    //         >
    //           {record?.percentage[cols[8]]
    //             ? record?.percentage[cols[8]] > 0
    //               ? "+" + record?.percentage[cols[8]]?.toFixed(2)
    //               : record?.percentage[cols[8]]?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[9]}</span>
    //     </div>
    //   ),
    //   dataIndex: "rejected",
    //   sorter: (a, b) => a?.sales[cols[9]] - b?.sales[cols[9]],
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex flex-col items-center">
    //         <span className="text-[11px] text-black">
    //           {currencySign ? "R " : ""} {record?.sales[cols[9]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#15CAB8]"
    //           style={{
    //             color: record?.percentage[cols[9]] < 0 ? "#FF380D" : "#15CAB8",
    //           }}
    //         >
    //           {record?.percentage[cols[9]]
    //             ? record?.percentage[cols[9]] > 0
    //               ? "+" + record?.percentage[cols[9]]?.toFixed(2)
    //               : record?.percentage[cols[9]]?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[10]}</span>
    //     </div>
    //   ),
    //   sorter: (a, b) => a?.sales[cols[10]] - b?.sales[cols[10]],
    //   dataIndex: "rejected",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex flex-col items-center">
    //         <span className="text-[11px] text-black">
    //           {currencySign ? "R " : ""} {record?.sales[cols[10]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#15CAB8]"
    //           style={{
    //             color: record?.percentage[cols[10]] < 0 ? "#FF380D" : "#15CAB8",
    //           }}
    //         >
    //           {record?.percentage[cols[10]]
    //             ? record?.percentage[cols[10]] > 0
    //               ? "+" + record?.percentage[cols[10]]?.toFixed(2)
    //               : record?.percentage[cols[10]]?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">{cols[11]}</span>
    //     </div>
    //   ),
    //   dataIndex: "rejected",
    //   sorter: (a, b) => a?.sales[cols[11]] - b?.sales[cols[11]],
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <div className="w-full flex flex-col items-center">
    //         <span className="text-[11px] text-black">
    //           {currencySign ? "R " : ""} {record?.sales[cols[11]]}
    //         </span>
    //         <span
    //           className="text-[11px] text-[#15CAB8]"
    //           style={{
    //             color:
    //               Number(record?.percentage[cols[11]]) < 0
    //                 ? "#FF380D"
    //                 : "#15CAB8",
    //           }}
    //         >
    //           {Number(record?.percentage[cols[11]])
    //             ? Number(record?.percentage[cols[11]]) > 0
    //               ? "+" + Number(record?.percentage[cols[11]])?.toFixed(2)
    //               : Number(record?.percentage[cols[11]])?.toFixed(2)
    //             : 0}
    //           %
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Total</span>
        </div>
      ),
      sorter: (a, b) => a.totalSales - b.totalSales,
      dataIndex: "curPolicy",
      render: (_, record) => (
        <div className="w-full flex flex-col items-center">
          <span className="text-[11px] text-black">
            {currencySign ? "R " : ""}{" "}
            {Object.values(record?.sales).reduce(
              (sum, value) => sum + value,
              0
            )}
            {percentSign ? "%" : ""}
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        id="newOrders"
        rootClassName="orders-table"
        scroll={{ x: 2000 }}
        pagination={{
          pageSize: 50,
        }}
      />
      {showTrendChart && (
        <TrendChartModal
          show={showTrendChart}
          close={() => {
            setShowTrendChart(false);
          }}
          data={trendChartData?.data}
          labels={trendChartData?.labels}
          dotSize={trendChartData?.dotSize}
          active={active}
        />
      )}
    </>
  );
};

export default Last3MonthsTrend;
