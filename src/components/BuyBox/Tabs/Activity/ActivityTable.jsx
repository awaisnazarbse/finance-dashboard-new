import { Table } from "antd";
import Image from "next/image";

const ActivityTable = () => {
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
        <div className="flex items-center">
          <Image alt="product img" src={"/images/product-img.png"} width={60} height={60} />
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-black">
              {record?.product?.productName}
            </span>
            <span className="text-xs text-[#1569BD]">
              R {record?.product?.productPrice?.toFixed(2)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center">
          <span className="text-xs text-[#777777] text-center">Old Price</span>
        </div>
      ),
      dataIndex: "oldPrice",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="flex flex-col space-y-1 items-start">
            <span className="text-xs text-black font-medium text-center">
              R {record?.oldPrice?.toFixed(2)}
            </span>
            <span className="text-xs text-[#777777]">N/A</span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center">
          <span className="text-xs text-[#777777] text-center">New Price</span>
        </div>
      ),
      dataIndex: "newPrice",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="flex flex-col space-y-1 items-start">
            <span className="text-xs text-black font-medium text-center">
              R {record?.newPrice?.toFixed(2)}
            </span>
            <span className="text-xs text-[#777777]">Free Sprint Shoppers</span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-xs text-[#777777] text-center">Offers</span>
        </div>
      ),
      dataIndex: "offers",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ background: "rgba(21, 105, 189, 0.22)" }}
          >
            <span className="text-xs text-black text-center">
              {record?.offers}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-xs text-[#777777] text-center">Auto</span>
        </div>
      ),
      dataIndex: "auto",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-xs text-black text-center font-medium">
            R {record?.auto?.from?.toFixed(1)} - R {record?.auto?.to?.toFixed(1)}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-xs text-[#777777] text-center">Reason</span>
        </div>
      ),
      dataIndex: "reason",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-xs text-black text-center font-medium">
            {record?.reason}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center">
          <span className="text-xs text-[#777777] text-center">Time</span>
        </div>
      ),
      dataIndex: "time",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="flex flex-col space-y-1 items-start">
            <span className="text-xs text-black font-medium text-center">
              {record?.time}
            </span>
            <span className="text-xs text-[#777777]">{record?.date}</span>
          </div>
        </div>
      ),
    },
  ];
  const data = [
    {
      product: {
        productName: "New Arival Baby Calculator",
        productPrice: 299,
      },
      oldPrice: 0,
      newPrice: 567,
      offers: 1,
      auto: {
        from: 567,
        to: 677,
      },
      reason: "Manual",
      time: "10:00 pm",
      date: "10/07/23",
    },
    {
      product: {
        productName: "New Arival Baby Calculator",
        productPrice: 299,
      },
      oldPrice: 0,
      newPrice: 567,
      offers: 1,
      auto: {
        from: 567,
        to: 677,
      },
      reason: "Manual",
      time: "10:00 pm",
      date: "10/07/23",
    },
    {
      product: {
        productName: "New Arival Baby Calculator",
        productPrice: 299,
      },
      oldPrice: 0,
      newPrice: 567,
      offers: 1,
      auto: {
        from: 567,
        to: 677,
      },
      reason: "Manual",
      time: "10:00 pm",
      date: "10/07/23",
    },
    {
      product: {
        productName: "New Arival Baby Calculator",
        productPrice: 299,
      },
      oldPrice: 0,
      newPrice: 567,
      offers: 1,
      auto: {
        from: 567,
        to: 677,
      },
      reason: "Manual",
      time: "10:00 pm",
      date: "10/07/23",
    },
    {
      product: {
        productName: "New Arival Baby Calculator",
        productPrice: 299,
      },
      oldPrice: 0,
      newPrice: 567,
      offers: 1,
      auto: {
        from: 567,
        to: 677,
      },
      reason: "Manual",
      time: "10:00 pm",
      date: "10/07/23",
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
        />
      </div>
    </div>
  );
};

export default ActivityTable;
