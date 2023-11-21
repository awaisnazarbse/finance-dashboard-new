import { Table } from "antd";
import Image from "next/image";
import TrendChart from "./TrendChart";
import dayjs from "dayjs";
import TrendChartModal from "./TrendChartModal";

const ReturnPercentTable = ({
  data,
  currencySign = false,
  dates,
  isLoading,
  showTrendChart,
  setShowTrendChart,
  trendChartData,
  setTrendChartData,
}) => {
  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Products</span>
        </div>
      ),
      dataIndex: "product",
      render: (_, record) => (
        <div className="flex items-center">
          {/* <Image alt="alt text" src={"/images/product-img.png"} width={60} height={60} /> */}
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] text-black line-clamp-2">{record?.product}</span>
            {/* <span className="text-[11px] text-[#1569BD]">
              ${record?.product?.productPrice}
            </span> */}
          </div>
        </div>
      ),
      width: "250px",
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
              data: Object.values(record?.sales),
              labels: Object.keys(record?.sales),
              dotSize: 2,
            });
            setShowTrendChart(true);
          }}
        >
          <TrendChart data={record?.refundsPercent} dotSize={2} />
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">
            {dayjs(dates[0]).format("DD/MM/YY")} -
            {dayjs(dates[1]).format("DD/MM/YY")}
          </span>
        </div>
      ),
      sorter: (a, b) => a.rangeRefundsPercent - b.rangeRefundsPercent,
      dataIndex: "curPolicy",
      render: (_, record) => (
        <div className="w-full flex flex-col items-center">
          <span className="text-[11px] text-black">
            {currencySign ? "R " : ""} {record?.rangeRefundsPercent}
          </span>
          <span
            className="text-[11px] text-[#FF380D]"
            style={{
              color:
                Number(record?.rangeRefundsPercent) < 0 ? "#FF380D" : "#15CAB8",
            }}
          >
            {Number(record?.rangeRefundsPercent) === 0
              ? "+" + 100
              : Number(record?.rangeSalePercent) > 0
              ? "+" + record?.rangeSalePercent
              : record?.rangeSalePercent}
            %
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Jan</span>
        </div>
      ),
      dataIndex: "complaint",
      sorter: (a, b) => a.refundsPercent[0] - b.refundsPercent[0],
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""} {record?.refundsPercent[0]}%
            </span>
            <span
              className="text-[11px] text-[#FF380D]"
              style={{
                color: Number(record?.percent[0]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {record?.percent[0]
                ? Number(record?.percent[0]) > 0
                  ? "+" + Number(record?.percent[0])
                  : Number(record?.percent[0])
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Feb</span>
        </div>
      ),
      dataIndex: "nonComplaint",
      sorter: (a, b) => a.refundsPercent[1] - b.refundsPercent[1],
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex-col flex items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""}
              {record?.refundsPercent[1]}%
            </span>
            <span
              className="text-[11px] text-[#15CAB8]"
              style={{
                color: Number(record?.percent[1]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {Number(record?.percent[1])
                ? Number(record?.percent[1]) > 0
                  ? "+" + Number(record?.percent[1])
                  : Number(record?.percent[1])
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Mar</span>
        </div>
      ),
      sorter: (a, b) => a.refundsPercent[2] - b.refundsPercent[2],
      dataIndex: "spf",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex-col flex items-center">
            <span
              className="text-[11px]"
              //   style={{
              //     color: record?.ads < 0 ? "#FF380D" : "#15CAB8",
              //   }}
            >
              {currencySign ? "R " : ""} {record?.refundsPercent[2]}%
            </span>
            <span
              className="text-[11px] text-[#FF380D]"
              style={{
                color: Number(record?.percent[2]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {Number(record?.percent[2])
                ? Number(record?.percent[2]) > 0
                  ? "+" + Number(record?.percent[2])
                  : Number(record?.percent[2])
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Apr</span>
        </div>
      ),
      dataIndex: "dkim",
      sorter: (a, b) => a.refundsPercent[3] - b.refundsPercent[3],
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""} {record?.refundsPercent[3]}%
            </span>
            <span
              className="text-[11px] text-[#15CAB8]"
              style={{
                color: Number(record?.percent[3]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {Number(record?.percent[3])
                ? Number(record?.percent[3]) > 0
                  ? "+" + Number(record?.percent[3])
                  : Number(record?.percent[3])
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">May</span>
        </div>
      ),
      dataIndex: "accepted",
      sorter: (a, b) => a.refundsPercent[4] - b.refundsPercent[4],
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""}
              {record?.refundsPercent[4]}%
            </span>
            <span
              className="text-[11px] text-[#FF380D]"
              style={{
                color: Number(record?.percent[4]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {Number(record?.percent[4])
                ? Number(record?.percent[4]) > 0
                  ? "+" + Number(record?.percent[4])
                  : Number(record?.percent[4])
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Jun</span>
        </div>
      ),
      sorter: (a, b) => a.refundsPercent[5] - b.refundsPercent[5],
      dataIndex: "quarantine",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""} {record?.refundsPercent[5]}%
            </span>
            <span
              className="text-[11px] text-[#15CAB8]"
              style={{
                color: Number(record?.percent[5]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {Number(record?.percent[5])
                ? Number(record?.percent[5]) > 0
                  ? "+" + Number(record?.percent[5])
                  : Number(record?.percent[5])
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Jul</span>
        </div>
      ),
      sorter: (a, b) => a.refundsPercent[6] - b.refundsPercent[6],
      dataIndex: "rejected",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""} {record?.refundsPercent[6]}%
            </span>
            <span
              className="text-[11px] text-[#FF380D]"
              style={{
                color: Number(record?.percent[6]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {Number(record?.percent[6])
                ? Number(record?.percent[6]) > 0
                  ? "+" + Number(record?.percent[6])
                  : Number(record?.percent[6])
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Aug</span>
        </div>
      ),
      sorter: (a, b) => a.refundsPercent[7] - b.refundsPercent[7],
      dataIndex: "rejected",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""} {record?.refundsPercent[7]}%
            </span>
            <span
              className="text-[11px] text-[#15CAB8]"
              style={{
                color: Number(record?.percent[7]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {Number(record?.percent[7])
                ? Number(record?.percent[7]) > 0
                  ? "+" + Number(record?.percent[7])
                  : Number(record?.percent[7])
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Sep</span>
        </div>
      ),
      sorter: (a, b) => a.refundsPercent[8] - b.refundsPercent[8],
      dataIndex: "rejected",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""} {record?.refundsPercent[8]}%
            </span>
            <span
              className="text-[11px] text-[#15CAB8]"
              style={{
                color: Number(record?.percent[8]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {Number(record?.percent[8])
                ? Number(record?.percent[8]) > 0
                  ? "+" + Number(record?.percent[8])
                  : Number(record?.percent[8])
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Oct</span>
        </div>
      ),
      dataIndex: "rejected",
      sorter: (a, b) => a.refundsPercent[9] - b.refundsPercent[9],
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""} {record?.refundsPercent[9]}%
            </span>
            <span
              className="text-[11px] text-[#15CAB8]"
              style={{
                color: Number(record?.percent[9]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {Number(record?.percent[9])
                ? Number(record?.percent[9]) > 0
                  ? "+" + Number(record?.percent[9])
                  : Number(record?.percent[9])
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Nov</span>
        </div>
      ),
      sorter: (a, b) => a.refundsPercent[10] - b.refundsPercent[10],
      dataIndex: "rejected",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""} {record?.refundsPercent[10]}%
            </span>
            <span
              className="text-[11px] text-[#15CAB8]"
              style={{
                color: Number(record?.percent[10]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {Number(record?.percent[10])
                ? Number(record?.percent[10]) > 0
                  ? "+" + Number(record?.percent[10])
                  : Number(record?.percent[10])
                : 0}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Dec</span>
        </div>
      ),
      dataIndex: "rejected",
      sorter: (a, b) => a.refundsPercent[11] - b.refundsPercent[11],
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] text-black">
              {currencySign ? "R " : ""} {record?.refundsPercent[11]}%
            </span>
            <span
              className="text-[11px] text-[#15CAB8]"
              style={{
                color: Number(record?.percent[11]) < 0 ? "#FF380D" : "#15CAB8",
              }}
            >
              {Number(record?.percent[11])
                ? Number(record?.percent[11]) > 0
                  ? "+" + Number(record?.percent[11])
                  : Number(record?.percent[11])
                : 0}
              %
            </span>
          </div>
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
        scroll={{ x: 1500 }}
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
        />
      )}
    </>
  );
};

export default ReturnPercentTable;
