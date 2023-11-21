import TrendChart from "@/components/Home/Tabs/Trend/TrendTable/TrendChart";
import calculateUnitsOrderedForProduct from "@/utils/calculateUnitsOrderedForProduct";
import { Table, Image as AntdImage, Popconfirm, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
import ProductSettingsModal from "./ProductSettingsModal";
import { useState } from "react";
import getManufacturingAndLogistics from "@/utils/getManufacturingAndLogistics";
import getSupplierOrderDays from "@/utils/getSupplierOrderDays";
import { MdOutlineWarningAmber, MdWarning } from "react-icons/md";
import { AiFillWarning } from "react-icons/ai";

const RecordsTable = ({
  data,
  isLoading,
  searchedText,
  purchaseOrders,
  manufacturingAndLogistics,
  supplierOrderSettings,
}) => {
  const [settingsModal, setSettingsModal] = useState(false);
  const [productData, setProductData] = useState();
  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Product List</span>
        </div>
      ),
      dataIndex: "product",
      width: "450px",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.title).toLowerCase().includes(value.toLowerCase()) ||
          String(record.sku).includes(value) ||
          String(record.tsin_id).includes(value)
        );
      },
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <AntdImage
            alt="alt text"
            src={record?.image_url ? record?.image_url : ""}
            width={60}
            height={40}
          />
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] text-black">{record?.title}</span>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-black opacity-70">
                R {record?.selling_price}
              </span>
              <div className="w-1 h-1 rounded-full bg-gray-400 opacity-90"></div>
              <span className="text-[11px] text-black opacity-70">
                COG: R {record?.cog}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777]">Stock</span>
        </div>
      ),
      dataIndex: "fbaStock",
      render: (_, record) => {
        let totalStockInHand = 0;
        record?.leadtime_stock?.forEach((e) => {
          totalStockInHand += e?.quantity_available;
        });
        return (
          <div className="flex items-center justify-center space-x-2 w-[7rem] h-[5rem]">
            {/* <TrendChart dotSize={0} /> */}
            <span className="text-[11px]">
              {record?.stock_at_takealot_total + totalStockInHand}
            </span>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">
            Stock on Way
          </span>
        </div>
      ),
      dataIndex: "reserved",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-[11px] text-black text-center">
            {record?.total_stock_on_way}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">
            Stock Value
          </span>
        </div>
      ),
      dataIndex: "stockValue",
      render: (_, record) => {
        let totalStockInHand = 0;
        record?.leadtime_stock?.forEach((e) => {
          totalStockInHand += e?.quantity_available;
        });
        return (
          <div className="flex items-center justify-center space-x-2 w-[7rem] h-[5rem]">
            {/* <TrendChart dotSize={0} /> */}
            <span className="text-[11px]">
              {`R ${(
                (record?.stock_at_takealot_total + totalStockInHand) *
                record?.cog
              ).toFixed(2)}`}
            </span>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">
            Sales Velocity (Unit/Day)
          </span>
        </div>
      ),
      dataIndex: "salesVelocity",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-[11px] text-black text-center">
            {(record?.itemsSoldLast30Days / 30).toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">
            Days of Stock left
          </span>
        </div>
      ),
      dataIndex: "stockDaysLeft",
      render: (_, record) => {
        let totalStockInHand = 0;
        record?.leadtime_stock?.forEach((e) => {
          totalStockInHand += e?.quantity_available;
        });
        totalStockInHand += record?.stock_at_takealot_total;
        let saleVelocity = record?.itemsSoldLast30Days / 30;
        const totalDays =
          supplierOrderSettings?.length <= 0
            ? 90
            : getSupplierOrderDays(
                Number(record?.offer_id),
                supplierOrderSettings
              );
        const daysOfStockLeft = saleVelocity * totalStockInHand;
        const alert = daysOfStockLeft < totalDays;
        return (
          <div className="w-full flex items-center justify-center">
            <div
              className="px-2 py-1 w-14 rounded-[16px] flex items-center justify-between space-x-2"
              style={{
                background: alert ? "#F7D2CD" : "rgba(11, 163, 163, 0.25)",
              }}
            >
              {alert ? (
                <MdOutlineWarningAmber size={15} color="#F57266" />
              ) : (
                <BsCheckCircle color="#0BA3A3" />
              )}
              <span className="text-[11px] text-black text-center">
                {Math.floor(daysOfStockLeft)}
              </span>
            </div>
          </div>
          // <div className="flex items-center justify-center space-x-2 w-[7rem] h-[5rem]">
          //   {/* <TrendChart dotSize={0} /> */}
          //   <span className="text-[11px]">
          //     {Math.floor(saleVelocity * totalStockInHand)}
          //   </span>
          // </div>
        );
      },
      // render: (_, record) => (
      //   <div className="w-full flex items-center justify-center">
      //     <div
      //       className="px-3 py-2 rounded-[16px] flex items-center justify-center space-x-2"
      //       style={{ background: "rgba(11, 163, 163, 0.25)" }}
      //     >
      //       <BsCheckCircle color="#0BA3A3" />
      //       <span className="text-[11px] text-black text-center">
      //         {/* {record?.stockDaysLeft} */}-
      //       </span>
      //     </div>
      //   </div>
      // ),
    },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">Sent to FBA</span>
    //     </div>
    //   ),
    //   dataIndex: "sentToFba",
    //   render: (_, record) => (
    //     <div className="flex items-center space-x-2 w-[7rem] h-[5rem]">
    //       {/* <TrendChart dotSize={0} /> */}
    //       <span>
    //         {record?.sentToFba}
    //       </span>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4 justify-center">
    //       <span className="text-[11px] text-[#777777] text-center">
    //         Prep Center Stock
    //       </span>
    //     </div>
    //   ),
    //   dataIndex: "prepStock",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center justify-center">
    //       <span className="text-[11px] text-black text-center">
    //         {record?.prepStock}
    //       </span>
    //     </div>
    //   ),
    // },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">
            Ordered
          </span>
        </div>
      ),
      dataIndex: "productUnitsOrdered",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-[11px] text-black text-center">
            {calculateUnitsOrderedForProduct(record?.title, purchaseOrders)}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">
            Days Until Next Order
          </span>
        </div>
      ),
      dataIndex: "daysNextOrder",
      render: (_, record) => {
        let totalStockInHand = 0;
        record?.leadtime_stock?.forEach((e) => {
          totalStockInHand += e?.quantity_available;
        });
        totalStockInHand += record?.stock_at_takealot_total;
        let saleVelocity = record?.itemsSoldLast30Days / 30;
        const stockDaysLeft = saleVelocity * totalStockInHand;
        const manufacturingAndLogisticsDays = getManufacturingAndLogistics(
          record?.offer_id,
          manufacturingAndLogistics
        );
        const alert =
          manufacturingAndLogisticsDays - stockDaysLeft <
          manufacturingAndLogisticsDays;
        return (
          <div className="w-full flex items-center justify-center">
            <div
              className="px-2 py-1 w-14 rounded-[16px] flex items-center justify-between space-x-2"
              style={{
                background: alert ? "#F7D2CD" : "rgba(11, 163, 163, 0.25)",
              }}
            >
              {alert ? (
                <MdOutlineWarningAmber size={15} color="#F57266" />
              ) : (
                <BsCheckCircle color="#0BA3A3" />
              )}
              <span className="text-[11px] text-black text-center">
                {manufacturingAndLogistics?.length <= 0
                  ? "0"
                  : manufacturingAndLogisticsDays === 0
                  ? "0"
                  : Math.floor(manufacturingAndLogisticsDays - stockDaysLeft)}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">
            Recommended quantity for reordering
          </span>
        </div>
      ),
      dataIndex: "recommendedQuantity",
      render: (_, record) => {
        const totalDays =
          supplierOrderSettings?.length <= 0
            ? 90
            : getSupplierOrderDays(
                Number(record?.offer_id),
                supplierOrderSettings
              );
        const saleVelocity = record?.itemsSoldLast30Days / 30;
        const recommendedQuantity = totalDays * saleVelocity;
        return (
          <div className="flex items-center justify-center space-x-2 w-[7rem] h-[5rem]">
            <span className="text-[11px] text-black text-center">
              {Math.floor(recommendedQuantity)}
            </span>
          </div>
        );
      },
    },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4 justify-center">
    //       <span className="text-[11px] text-[#777777] text-center">ROI</span>
    //     </div>
    //   ),
    //   dataIndex: "roi",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center justify-center">
    //       <span className="text-[11px] text-black text-center">
    //         {record?.roi}
    //       </span>
    //     </div>
    //   ),
    // },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4 justify-center">
    //       <span className="text-[11px] text-[#777777] text-center">
    //         Comments
    //       </span>
    //     </div>
    //   ),
    //   dataIndex: "comments",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center justify-center">
    //       <span className="text-[11px] text-black text-center">
    //         {record?.comments}
    //       </span>
    //     </div>
    //   ),
    // },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777]">Actions</span>
        </div>
      ),
      dataIndex: "action",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <Popconfirm
            placement="left"
            title={
              <div className="flex flex-col space-y-2">
                <span
                  type="link"
                  className="flex items-center space-x-2 font-poppins cursor-pointer hover:text-black"
                  onClick={() => {
                    setProductData(record);
                    setSettingsModal(true);
                  }}
                >
                  Edit
                </span>
                <Link
                  href={"/"}
                  className="flex items-center space-x-2 font-poppins hover:text-black"
                >
                  Create purchase order
                </Link>
              </div>
            }
            description=""
            icon={null}
          >
            <Image
              alt="alt text"
              className="cursor-pointer mr-5"
              src={"/icons/more.svg"}
              width={15}
              height={3}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];
  // const data = [
  //   {
  //     product: {
  //       productName: "New Arival Baby Calculator",
  //       productPrice: 299,
  //     },
  //     fbaStock: 354,
  //     reserved: 0,
  //     stockValue: 67600,
  //     salesVelocity: 12.89,
  //     stockDaysLeft: 55,
  //     sentToFba: 8,
  //     prepStock: 67600,
  //     ordered: 56,
  //     daysNextOrder: 55,
  //     recommendedQuantity: 6,
  //     roi: 10,
  //     comments: 6776,
  //   },
  //   {
  //     product: {
  //       productName: "New Arival Baby Calculator",
  //       productPrice: 299,
  //     },
  //     fbaStock: 354,
  //     reserved: 0,
  //     stockValue: 67600,
  //     salesVelocity: 12.89,
  //     stockDaysLeft: 55,
  //     sentToFba: 8,
  //     prepStock: 67600,
  //     ordered: 56,
  //     daysNextOrder: 55,
  //     recommendedQuantity: 6,
  //     roi: 10,
  //     comments: 6776,
  //   },
  //   {
  //     product: {
  //       productName: "New Arival Baby Calculator",
  //       productPrice: 299,
  //     },
  //     fbaStock: 354,
  //     reserved: 0,
  //     stockValue: 67600,
  //     salesVelocity: 12.89,
  //     stockDaysLeft: 55,
  //     sentToFba: 8,
  //     prepStock: 67600,
  //     ordered: 56,
  //     daysNextOrder: 55,
  //     recommendedQuantity: 6,
  //     roi: 10,
  //     comments: 6776,
  //   },
  //   {
  //     product: {
  //       productName: "New Arival Baby Calculator",
  //       productPrice: 299,
  //     },
  //     fbaStock: 354,
  //     reserved: 0,
  //     stockValue: 67600,
  //     salesVelocity: 12.89,
  //     stockDaysLeft: 55,
  //     sentToFba: 8,
  //     prepStock: 67600,
  //     ordered: 56,
  //     daysNextOrder: 55,
  //     recommendedQuantity: 6,
  //     roi: 10,
  //     comments: 6776,
  //   },
  //   {
  //     product: {
  //       productName: "New Arival Baby Calculator",
  //       productPrice: 299,
  //     },
  //     fbaStock: 354,
  //     reserved: 0,
  //     stockValue: 67600,
  //     salesVelocity: 12.89,
  //     stockDaysLeft: 55,
  //     sentToFba: 8,
  //     prepStock: 67600,
  //     ordered: 56,
  //     daysNextOrder: 55,
  //     recommendedQuantity: 6,
  //     roi: 10,
  //     comments: 6776,
  //   },
  // ];

  return (
    <div className="px-5">
      <div className="bg-white rounded-[10px] shadow-lg p-8 w-full flex flex-col space-y-8">
        <Table
          columns={columns}
          dataSource={data}
          id="newOrders"
          rootClassName="orders-table"
          scroll={{ x: 1600 }}
          loading={isLoading}
        />
      </div>
      {settingsModal && (
        <ProductSettingsModal
          show={settingsModal}
          close={() => {
            setSettingsModal(false);
          }}
          data={productData}
          setData={setProductData}
        />
      )}
    </div>
  );
};

export default RecordsTable;
