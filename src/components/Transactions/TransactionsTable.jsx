import { Select, Table, DatePicker } from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
const DisbursmentChart = dynamic(import("./DisbursmentChart"));

const { RangePicker } = DatePicker;

const TransactionsTable = ({
  data,
  pageSummary,
  setCurrentPage,
  currentPage,
  setStartDate,
  setEndDate,
  setDuration,
  loading,
  disbursment,
  graphData,
}) => {
  console.log("graph data", graphData);
  const [openRangePicker, setOpenRangePicker] = useState(false);

  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Date</span>
        </div>
      ),
      dataIndex: "date_created",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-xs text-black">{record?.date_created}</span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Description</span>
        </div>
      ),
      dataIndex: "description",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-xs text-black">
            {record?.description || "-"}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Transaction Type</span>
        </div>
      ),
      dataIndex: "transaction_type",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-xs text-black">
              {record?.transaction_type?.description || "-"}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Amount</span>
        </div>
      ),
      dataIndex: "amount",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span
              className="text-xs text-black"
              style={{
                color:
                  Number(record?.inc_vat) > 0 ? "#0BA3A3" : "rgb(220 38 38)",
              }}
            >
              {`R ${Number(record?.inc_vat)?.toFixed(2)}`}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Balance</span>
        </div>
      ),
      dataIndex: "balance",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-xs text-black">
              R {Number(record?.balance)?.toFixed(2) || "-"}
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <div
        className="flex flex-col justify-between bg-white p-4 py-6 rounded-[10px] w-full space-y-4"
        style={{
          boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        }}
      >
        <Select
          placeholder="Last 3 Months"
          // value={duration}
          options={[
            { label: "This Month", value: "This Month" },
            { label: "Last Month", value: "Last Month" },
            { label: "Last 3 Months", value: "Last 3 Months" },
            { label: "Last 6 Months", value: "Last 6 Months" },
            // { label: "This Year", value: "This Year" },
            { label: "Custom", value: "Custom" },
          ]}
          onChange={(e) => {
            setDuration(e);
            if (e === "Custom") {
              setOpenRangePicker(true);
            }
          }}
          suffixIcon={
            <Image
              alt="alt text"
              src="/icons/downarrow.svg"
              width={13}
              height={5}
            />
          }
          bordered={false}
          className="border border-[#C2BDBD] w-40 rounded-md text-sm"
        />
        {openRangePicker && (
          <div
            className="bg-white shadow-lg p-5 rounded-lg absolute top-14 left-32 topbar-range-picker z-50 flex flex-col space-y-2"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
            }}
          >
            <div className="w-full flex items-center justify-end">
              <span
                className="cursor-pointer"
                onClick={() => setOpenRangePicker(false)}
              >
                X
              </span>
            </div>
            <span className="text-sm">Select custom date range</span>
            <RangePicker
              // value={[dayjs(startDate), dayjs(endDate)]}
              className="p-3 border border-[#C2BDBD]"
              format={"DD MMM YYYY"}
              onChange={(e) => {
                setStartDate(dayjs(e[0]).toDate());
                setEndDate(dayjs(e[1]).toDate());
                // setOpenRangePicker(false);
              }}
              // open={openRangePicker}
              // disabled={
              //   duration === "Last 3 Months" ||
              //   duration === "Last 6 Months" ||
              //   duration === "This Year" ||
              //   duration === "This Month" ||
              //   duration === "Last Month"
              // }
            />
          </div>
        )}
        {loading && !graphData ? null : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <DisbursmentChart
                overviewData={graphData ? Object.values(graphData) : []}
                graphLabels={graphData ? Object.keys(graphData) : []}
              />
            </div>
            <div className="p-5">
              <div
                className="bg-white rounded-md flex items-center justify-between p-5 w-fit"
                style={{
                  boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                }}
              >
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-gray-300">
                    Total Disbursment
                  </span>
                  <span className="text-lg font-semibold">R {disbursment}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <Table
          columns={columns}
          dataSource={data}
          id="newOrders"
          rootClassName="orders-table"
          scroll={{ x: 500 }}
          loading={loading}
          pagination={{
            pageSize: 50,
            total: pageSummary?.total,
            current: currentPage,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
            },
          }}
        />
      </div>
    </div>
  );
};

export default TransactionsTable;
