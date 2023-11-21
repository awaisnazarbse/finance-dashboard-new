import { Table } from "antd";
import dayjs from "dayjs";

const TopTable = ({ data, isLoading, dates, cols, duration, loading }) => {
  console.log("data in pl", data);
  console.log("cols in pl", cols);
  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Parameter</span>
        </div>
      ),
      dataIndex: "product",
      render: (_, record) => (
        <div className="flex items-center">
          <span className="text-xs text-black">{record?.parameter}</span>
        </div>
      ),
      fixed: "left",
    },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-xs text-[#777777]">
    //         {dayjs(dates[0]).format("DD/MM/YY") +
    //           " - " +
    //           dayjs(dates[1]).format("DD/MM/YY")}
    //       </span>
    //     </div>
    //   ),
    //   dataIndex: "curPolicy",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <span className="text-xs text-black">{record?.today}</span>
    //     </div>
    //   ),
    // },
    ...cols?.map((title, index) => ({
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">{title}</span>
        </div>
      ),
      dataIndex: `sales[${index}].sales`, // Assuming your data structure matches this
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
              record?.parameter === "Cost of Goods"
                ? `R ${record[title] !== "-" ? record[title]?.toFixed(2) : "-"}`
                : record?.parameter === "Margin" || record?.parameter === "ROI"
                ? `${record[title] !== "-" ? record[title]?.toFixed(2) : "-"}%`
                : record[title]}
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
