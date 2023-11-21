import { Table, Tag, Image as AntdImage } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const RecordsTable = ({ data, searchedText, loading }) => {
  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">Date</span>
        </div>
      ),
      dataIndex: "time",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-[11px]">
              {dayjs.unix(Number(record?.return_date)).format("DD MMM YYYY")}
            </span>
          </div>
        </div>
      ),
    },
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
      width: "150px",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          {record?.cover_image_url && (
            <AntdImage
              alt="alt text"
              src={record?.cover_image_url}
              width={80}
              height={60}
            />
          )}
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] text-black line-clamp-2">
              {record?.title}
            </span>
            <div className="flex items-center space-x-2">
              <button className="p-1 px-4 flex items-center justify-center space-x-2 bg-primary rounded-[5px]">
                <Image
                  alt="alt text"
                  src={"/icons/document.svg"}
                  width={9}
                  height={12}
                />
                <span className="text-[8px] text-white">{record?.sku}</span>
              </button>
              <Link
                href={record?.product_url}
                target="_blank"
                className="bg-[#353535] p-1 px-4 flex items-center justify-center space-x-2 rounded-[5px]"
              >
                <Image
                  alt="alt text"
                  src={"/icons/document.svg"}
                  width={9}
                  height={12}
                />
                <span className="text-[8px] text-white">{record?.tsin_id}</span>
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
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">Reason</span>
        </div>
      ),
      dataIndex: "reason",
      render: (_, record) => (
        <div className="w-full flex justify-center items-center">
          <Tag
            className="text-[11px] p-2 py-1 w-fit"
            style={{
              background: "#EA7866",
            }}
            color="white"
          >
            {record?.seller_return_reason?.description}
          </Tag>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">Evaluation outcome</span>
        </div>
      ),
      dataIndex: "evaluationOutcome",
      render: (_, record) => (
        <div className="w-full flex justify-center items-center">
          <Tag
            className="text-[11px] p-2 py-1 w-fit"
            style={{
              background: "#EA7866",
            }}
            color="white"
          >
            {record?.seller_return_outcome?.description}
          </Tag>
        </div>
      ),
    },

    // {
    //   title: (
    //     <div className="flex items-center space-x-4 justify-center">
    //       <span className="text-[11px] text-[#777777] text-center">
    //         Customer
    //       </span>
    //     </div>
    //   ),
    //   dataIndex: "customer",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center justify-center">
    //       <div className="flex items-center space-x-2">
    //         {/* <div className="relative w-6 h-6 rounded-full">
    //           <Image src="/images/customer.png" fill={true} />
    //         </div> */}

    //         <span
    //           className="text-center"
    //           style={{ color: "rgba(0, 0, 0, 0.43)" }}
    //         >
    //           {record?.customer}
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4 justify-center">
    //       <span className="text-[11px] text-[#777777] text-center">DC</span>
    //     </div>
    //   ),
    //   dataIndex: "seller",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center justify-center">
    //       <span className="text-[11px] text-black text-center">
    //         {record?.dc}
    //       </span>
    //     </div>
    //   ),
    // },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">
            Quantity
          </span>
        </div>
      ),
      dataIndex: "quantity",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-[11px] text-black text-center">
            {record?.qty}
          </span>
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
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 100,
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default RecordsTable;
