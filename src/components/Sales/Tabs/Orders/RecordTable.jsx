import { Button, Table, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InvoiceModal from "./InvoiceModal";

const RecordsTable = ({ data, searchedText, loading, marketplace }) => {
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">OrderID</span>
        </div>
      ),
      dataIndex: "orderId",
      render: (_, record, index) => (
        <div className="w-full flex items-center">
          <span className="text-[11px] text-black">{record?.order_id}</span>
        </div>
      ),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.order_id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.product_title)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.sku).toLowerCase().includes(value.toLowerCase()) ||
          String(record.tsin).toLowerCase().includes(value.toLowerCase()) ||
          String(record.sale_status)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.customer).toLowerCase().includes(value.toLowerCase()) ||
          String(record.dc).toLowerCase().includes(value.toLowerCase()) ||
          String(record.promotion).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Product</span>
        </div>
      ),
      dataIndex: "product",
      width: "350px",
      render: (_, record) => (
        <div className="flex items-center">
          {record?.image_url && (
            <Image
              alt="alt text"
              src={record?.image_url}
              width={60}
              height={60}
            />
          )}
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] text-black line-clamp-2">
              {record?.product_title}
            </span>
            <div className="flex items-center space-x-2">
              <button className="p-1 px-4 flex items-center  space-x-2 bg-primary rounded-[5px]">
                <Image
                  alt="alt text"
                  src={"/icons/document.svg"}
                  width={9}
                  height={12}
                />
                <span className="text-[8px] text-white">{record?.sku}</span>
              </button>
              <Link
                href={record?.takealot_url}
                target="_blank"
                className="bg-[#353535] p-1 px-4 flex items-center  space-x-2 rounded-[5px]"
              >
                <Image
                  alt="alt text"
                  src={"/icons/document.svg"}
                  width={9}
                  height={12}
                />
                <span className="text-[8px] text-white">{record?.tsin}</span>
                <Image
                  alt="alt text"
                  src={"/icons/goto.svg"}
                  width={12}
                  height={12}
                />
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-[11px] text-[#777777] text-center">Status</span>
        </div>
      ),
      dataIndex: "status",
      render: (_, record) => (
        <div className="w-full flex  items-center">
          <Tag
            className="text-[11px] p-2 py-1 w-fit"
            style={{
              background:
                record?.sale_status === "Shipped to Customer"
                  ? "#00C851"
                  : "#EA7866",
            }}
            color="white"
          >
            {record?.sale_status}
          </Tag>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center  space-x-4">
          <span className="text-[11px] text-[#777777] text-center">Time</span>
        </div>
      ),
      dataIndex: "time",
      render: (_, record) => (
        <div className="w-full flex items-center ">
          <div className="w-full flex items-center ">
            <span
              className="text-[11px] text-center"
              style={{ color: "rgba(0, 0, 0, 0.43)" }}
            >
              {record?.order_date}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-[11px] text-[#777777] text-center">
            Customer
          </span>
        </div>
      ),
      dataIndex: "customer",
      render: (_, record) => (
        <div className="w-full flex items-center ">
          <div className="flex items-center space-x-2">
            {/* <div className="relative w-6 h-6 rounded-full">
              <Image src="/images/customer.png" fill={true} />
            </div> */}

            <span
              className="text-center"
              style={{ color: "rgba(0, 0, 0, 0.43)" }}
            >
              {record?.customer}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-[11px] text-[#777777] text-center">DC</span>
        </div>
      ),
      dataIndex: "seller",
      render: (_, record) => (
        <div className="w-full flex items-center ">
          <span className="text-[11px] text-black text-center">
            {record?.dc}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-[11px] text-[#777777] text-center">
            Quantity
          </span>
        </div>
      ),
      dataIndex: "quantity",
      render: (_, record) => (
        <div className="w-full flex items-center ">
          <span className="text-[11px] text-black text-center">
            {record?.quantity}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-[11px] text-[#777777] text-center">Price</span>
        </div>
      ),
      dataIndex: "price",
      render: (_, record) => (
        <div className="w-full flex items-center ">
          <span className="text-[11px] text-black text-center">
            R {record?.selling_price?.toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-[11px] text-[#777777] text-center">Fee</span>
        </div>
      ),
      dataIndex: "fee",
      render: (_, record) => (
        <div className="w-full flex items-center ">
          <span className="text-[11px] text-black text-center">
            R {record?.total_fee?.toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-[11px] text-[#777777] text-center">COG</span>
        </div>
      ),
      dataIndex: "cog",
      render: (_, record) => (
        <div className="w-full flex items-center ">
          <span className="text-[11px] text-black text-center">-</span>
        </div>
      ),
    },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4 ">
    //       <span className="text-[11px] text-[#777777] text-center">Net%</span>
    //     </div>
    //   ),
    //   dataIndex: "net",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center ">
    //       <span className="text-[11px] text-black text-center">-</span>
    //     </div>
    //   ),
    // },
    {
      title: (
        <div className="flex items-center space-x-4 ">
          <span className="text-[11px] text-[#777777] text-center">
            Invoice
          </span>
        </div>
      ),
      dataIndex: "net",
      render: (_, record) => (
        <div className="flex border rounded-md w-fit">
          <Button
            type="link"
            className="text-[11px] text-black  flex items-center space-x-2"
            onClick={() => {
              setInvoiceData(record);
              setInvoiceModal(true);
            }}
          >
            <span>Download</span>
            <Image
              alt="alt text"
              src={"/icons/download.svg"}
              width={12}
              height={14}
            />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <div className="bg-white rounded-[10px] p-8 w-full flex flex-col space-y-8">
        <Table
          columns={columns}
          dataSource={data}
          id="newOrders"
          rootClassName="orders-table"
          scroll={{ x: 1650 }}
          pagination={{
            pageSize: 100,
          }}
          loading={loading}
        />
      </div>
      {invoiceModal && (
        <InvoiceModal
          show={invoiceModal}
          close={() => {
            setInvoiceModal(false);
          }}
          data={invoiceData}
          setData={setInvoiceData}
        />
      )}
    </div>
  );
};

export default RecordsTable;
