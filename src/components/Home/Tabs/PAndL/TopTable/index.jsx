import { Table } from "antd";
import dayjs from "dayjs";

const TopTable = ({
  data,
  isLoading,
  dates,
  cols,
  duration,
  loading,
  setDates,
  setBottomTableDates,
  setBottomTableDuration,
  bottomTableDates,
}) => {
  console.log("data in pl", data);
  console.log("cols in pl", cols);
  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777] pl-5">Parameter</span>
        </div>
      ),
      dataIndex: "product",
      render: (_, record) => (
        <div className="flex items-center">
          <span className="text-xs text-black">{record?.parameter}</span>
        </div>
      ),
      fixed: "left",
      width: "200px"
    },
    ...cols?.map((col, index) => ({
      title: (
        <div className="flex items-center space-x-4">
          <span
            className="text-xs text-[#777777] cursor-pointer"
            style={{
              color:
                dayjs(col?.start).isSame(dayjs(bottomTableDates[0])) &&
                dayjs(col?.end).isSame(dayjs(bottomTableDates[1]))
                  ? "#f7b614"
                  : "#777777",
            }}
            onClick={() => {
              setBottomTableDuration("");
              setBottomTableDates([
                dayjs(col.start)?.toDate(),
                dayjs(col.end)?.toDate(),
              ]);
            }}
          >
            {col?.title}
          </span>
        </div>
      ),
      dataIndex: `sales[${index}].sales`,
      key: `sales[${index}].sales`,
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-xs text-black">
              {record?.parameter === "Sales" ||
              record?.parameter === "Takealot Fee" ||
              record?.parameter === "Net Profit" ||
              record?.parameter === "Gross Profit" ||
              record?.parameter === "Expenses" ||
              record?.parameter === "Estimated Payout" ||
              record?.parameter === "Cost of Goods" ||
              record?.parameter === "Return Cost"
                ? `R ${
                    record[col?.title] !== "-"
                      ? record[col?.title]?.toFixed(2)
                      : "-"
                  }`
                : record?.parameter === "Margin" || record?.parameter === "ROI"
                ? `${
                    record[col?.title] !== "-"
                      ? record[col?.title]?.toFixed(2)
                      : "-"
                  }%`
                : `R ${record[col?.title]?.toFixed(2)}`}
            </span>
          </div>
        </div>
      ),
    })),
  ];

  return (
    <div className="p-5">
      <div className="flex flex-col justify-between bg-white rounded-[10px] p-8 w-full">
        <Table
          columns={isLoading || loading ? [] : columns}
          dataSource={data}
          id="newOrders"
          rootClassName="orders-table"
          scroll={{
            x:
              duration === "Last 12 Months"
                ? 1500
                : duration === "Last 3 Months"
                ? 1800
                : 4000,
          }}
          pagination={false}
          loading={isLoading || loading}
        />
      </div>
    </div>
  );
};

export default TopTable;
