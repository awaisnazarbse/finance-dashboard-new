import { Table } from "antd";
import Image from "next/image";

const TrackingTable = ({ data }) => {
  const columns = [
    {
      title: (
        <div className="flex">
          <span className="text-xs text-[#777777]">Product List</span>
        </div>
      ),
      width: "400px",
      dataIndex: "product",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Image alt="alt text" src={record?.image} width={60} height={60} />
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-black">{record?.title}</span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex">
          <span className="text-xs text-[#777777]">Winner</span>
        </div>
      ),
      dataIndex: "winner",
      render: (_, record) => (
        <div className="flex">
          <span className="text-xs text-black">
            {record?.seller_detail?.display_name}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center">
          <span className="text-xs text-[#777777] text-center">My Price</span>
        </div>
      ),
      dataIndex: "myPrice",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="flex  items-start">
            <span className="text-base text-black font-medium text-center">
              -
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-xs text-[#777777] text-center">Offers</span>
        </div>
      ),
      dataIndex: "offers",
      render: (_, record) => (
        <div className="w-full flex items-center ">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ background: "rgba(21, 105, 189, 0.22)" }}
          >
            <span className="text-xs text-black text-center">
              {record?.other_offers
                ? record?.other_offers?.conditions[0]?.count
                : 0}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-xs text-[#777777] text-center">Status</span>
        </div>
      ),
      dataIndex: "status",
      render: (_, record) => (
        <div className="w-full flex items-center ">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ background: "#0BA3A3" }}
          >
            <span className="text-xs text-white text-center">B</span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-xs text-[#777777] text-center">Stock</span>
        </div>
      ),
      dataIndex: "stock",
      render: (_, record) => (
        <div className="w-full flex items-center ">
          {/* <div
            className="flex items-center  w-10 h-10 rounded-full"
            style={{ background: "#0BA3A3" }}
          >
            <span className="text-xs text-white text-center">S</span>
          </div> */}
          <span
            className="text-xs text-center font-medium"
            style={{
              color:
                record?.stock_availability?.status === "In stock"
                  ? "green"
                  : record?.stock_availability?.status === "Out of stock"
                  ? "red"
                  : "gold",
            }}
          >
            {record?.stock_availability?.status}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-xs text-[#777777] text-center">Auto</span>
        </div>
      ),
      dataIndex: "auto",
      render: (_, record) => (
        <div className="flex items-center ">
          <span className="text-base text-black text-center font-medium">
            {/* ${record?.auto?.from?.toFixed(1)} - ${record?.auto?.to?.toFixed(1)} */}
            -
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <div className="bg-white rounded-[10px] shadow-lg p-8 w-full flex flex-col space-y-8">
        <Table
          columns={columns}
          dataSource={data}
          id="newOrders"
          rootClassName="orders-table"
          scroll={{ x: 1000 }}
          pagination={{ pageSize: 50 }}
        />
      </div>
    </div>
  );
};

export default TrackingTable;
