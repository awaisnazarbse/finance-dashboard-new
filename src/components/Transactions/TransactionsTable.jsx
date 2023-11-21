import { Table } from "antd";

const TransactionsTable = ({ data, pageSummary, setCurrentPage, currentPage }) => {
  const columns = [
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
                  Number(record?.inc_vat) > 0
                    ? "#0BA3A3"
                    : "rgb(220 38 38)",
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
  ];

  return (
    <div className="p-5">
      <div
        className="flex flex-col justify-between bg-white p-4 py-6 rounded-[10px] w-full"
        style={{
          boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          id="newOrders"
          rootClassName="orders-table"
          scroll={{ x: 500 }}
          pagination={{
            pageSize: 50,
            total: pageSummary?.total,
            current: currentPage,
            onChange: (page, pageSize) => {
              setCurrentPage(page)
            }
          }}
        />
      </div>
    </div>
  );
};

export default TransactionsTable;
