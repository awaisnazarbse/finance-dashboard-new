import { useAuth } from "@/context/AuthContext";
import { Table } from "antd";
import DetailsModal from "./DetailsModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import userApi from "@/lib/user";
import offersApi from "@/lib/offers";

const ProductsTable = ({
  dates,
  // data,
  searchedText,
  selectedColumns,
  columns,
  record,
  modal,
  setRecord,
  setModal,
  productTitle,
  marketplace,
  startDate,
  endDate,
  essentialsLoading,
}) => {
  const { user } = useAuth();

  const { data, isLoading } = useQuery(
    ["products-sales2", startDate, endDate, productTitle, marketplace],
    async () => {
      let res;
      if (marketplace === "All market places") {
        const userApiKeys = await userApi.getActiveUserAPIKeys(user?.uid);
        res = await axios.post(
          `https://finance-dashboard-server-smoky.vercel.app/sales/products_sales`,
          {
            apiKey: user?.apiKey,
            startDate,
            endDate,
            productTitle,
            marketplace,
            userApiKeys,
          }
        );
      } else {
        res = await axios.post(
          // "http://localhost:3000/sales/products_sales",
          `https://finance-dashboard-server-smoky.vercel.app/sales/products_sales`,
          {
            apiKey: user?.apiKey,
            startDate,
            endDate,
            productTitle,
            marketplace,
          }
        );
      }
      console.log("product sales", res?.data);
      const offersWithCOG = await Promise.all(
        res.data?.map(async (offer) => {
          const cog = await offersApi.getOfferCOG(offer?.offer_id);

          return { ...offer, cog };
        })
      );
      return offersWithCOG;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  // const columns = [
  //   {
  //     title: (
  //       <div className="flex items-center space-x-4">
  //         <span className="text-xs text-[#777777]">Product</span>
  //       </div>
  //     ),
  //     dataIndex: "product",
  //     render: (_, record) => {
  //       console.log("record", record);
  //       return (
  //         <div className="flex items-center">
  //           {/* {record?.image_url && (
  //           <Image src={record?.image_url} width={60} height={60} />
  //         )} */}
  //           <div className="flex flex-col space-y-2">
  //             <span className="text-xs text-black">{record?.product}</span>
  //             <div className="flex items-center space-x-2">
  //               <Tooltip title="SKU">
  //                 <button className="p-1 px-4 flex items-center justify-center space-x-2 bg-[#1569BD] rounded-[5px]">
  //                   <Image
  //                     alt="docs"
  //                     src={"/icons/document.svg"}
  //                     width={9}
  //                     height={12}
  //                   />
  //                   <span className="text-xs text-white">{record?.sku}</span>
  //                 </button>
  //               </Tooltip>
  //               <Tooltip title="TSIN">
  //                 <Link
  //                   href={"#"}
  //                   className="bg-[#0BA3A3] p-1 px-4 flex items-center justify-center space-x-2 rounded-[5px]"
  //                 >
  //                   <Image
  //                     alt="documents"
  //                     src={"/icons/document.svg"}
  //                     width={9}
  //                     height={12}
  //                   />
  //                   <span className="text-xs text-white">{record?.tsin}</span>
  //                   <Image
  //                     alt="goto"
  //                     src={"/icons/goto.svg"}
  //                     width={12}
  //                     height={12}
  //                   />
  //                 </Link>
  //               </Tooltip>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     },
  //     filteredValue: [searchedText],
  //     onFilter: (value, record) => {
  //       return (
  //         String(record.product).toLowerCase().includes(value.toLowerCase()) ||
  //         String(record.sku).toLowerCase().includes(value.toLowerCase()) ||
  //         String(record.tsin).toLowerCase().includes(value.toLowerCase())
  //       );
  //     },
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center space-x-4 justify-center">
  //         <span className="text-xs text-[#777777] text-center">Units Sold</span>
  //       </div>
  //     ),
  //     sorter: (a, b) => a.unitSold - b.unitSold,
  //     dataIndex: "unitSold",
  //     render: (_, record) => (
  //       <div className="w-full flex justify-center items-center">
  //         <span className="text-xs text-center">{record?.unitSold}</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center space-x-4 justify-center">
  //         <span className="text-xs text-[#777777] text-center">Sales</span>
  //       </div>
  //     ),
  //     dataIndex: "sales",
  //     sorter: (a, b) => a.sales - b.sales,
  //     render: (_, record) => (
  //       <div className="w-full flex justify-center items-center">
  //         <span className="text-xs text-center">
  //           R {record?.sales?.toFixed(2)}
  //         </span>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center justify-center space-x-4">
  //         <span className="text-xs text-[#777777] text-center">Promo</span>
  //       </div>
  //     ),
  //     dataIndex: "promo",
  //     sorter: (a, b) => a.promo - b.promo,
  //     render: (_, record) => (
  //       <div className="w-full flex items-center justify-center">
  //         <div className="w-full flex items-center justify-center">
  //           <span className="text-xs text-center">
  //             R {record?.promo?.toFixed(2)}
  //           </span>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center justify-center space-x-4">
  //         <span className="text-xs text-[#777777] text-center">
  //           Takealot Fee
  //         </span>
  //       </div>
  //     ),
  //     dataIndex: "fee",
  //     sorter: (a, b) => a.fee - b.fee,
  //     render: (_, record) => (
  //       <div className="w-full flex items-center justify-center">
  //         <div className="w-full flex items-center justify-center">
  //           <span className="text-xs text-center">
  //             R {record?.fee?.toFixed(2)}
  //           </span>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center justify-center space-x-4">
  //         <span className="text-xs text-[#777777] text-center">
  //           Cost of Goods
  //         </span>
  //       </div>
  //     ),
  //     sorter: (a, b) => a.cog - b.cog,
  //     dataIndex: "cog",
  //     render: (_, record) => (
  //       <div className="w-full flex items-center justify-center">
  //         <div className="w-full flex items-center justify-center">
  //           <span className="text-xs text-center">-</span>
  //         </div>
  //       </div>
  //     ),
  //   },
  // {
  //   title: (
  //     <div className="flex items-center justify-center space-x-4">
  //       <span className="text-xs text-[#777777] text-center">
  //         Gross Profit
  //       </span>
  //     </div>
  //   ),
  //   dataIndex: "grossProfit",
  //   sorter: (a, b) => {
  //     let grossProfit1 = a?.sales - a?.fee;
  //     let grossProfit2 = b?.sales - b?.fee;
  //     return grossProfit1 - grossProfit2;
  //   },
  //   render: (_, record) => (
  //     <div className="w-full flex items-center justify-center">
  //       <div className="w-full flex items-center justify-center">
  //         <span className="text-xs text-center">
  //           R {(record?.sales - record?.fee)?.toFixed(2)}
  //         </span>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   title: (
  //     <div className="flex items-center justify-center space-x-4">
  //       <span className="text-xs text-[#777777] text-center">Net Profit</span>
  //     </div>
  //   ),
  //   sorter: (a, b) => {
  //     let grossProfit1 = a?.sales - a?.fee;
  //     let grossProfit2 = b?.sales - b?.fee;
  //     return grossProfit1 - grossProfit2;
  //   },
  //   dataIndex: "netProfit",
  //   render: (_, record) => (
  //     <div className="w-full flex items-center justify-center">
  //       <div className="w-full flex items-center justify-center">
  //         <span className="text-xs text-center">
  //           R {(record?.sales - record?.fee)?.toFixed(2)}
  //         </span>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   title: (
  //     <div className="flex items-center justify-center space-x-4">
  //       <span className="text-xs text-[#777777] text-center">Margin</span>
  //     </div>
  //   ),
  //   sorter: (a, b) => {
  //     let grossProfit1 = a?.sales - a?.fee;
  //     let grossProfit2 = b?.sales - b?.fee;
  //     return grossProfit1 - grossProfit2;
  //   },
  //   dataIndex: "margin",
  //   render: (_, record) => (
  //     <div className="w-full flex items-center justify-center">
  //       <div className="w-full flex items-center justify-center">
  //         <span className="text-xs text-center">-</span>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   title: (
  //     <div className="flex items-center justify-center space-x-4">
  //       <span className="text-xs text-[#777777] text-center">ROI</span>
  //     </div>
  //   ),
  //   sorter: (a, b) => {
  //     let grossProfit1 = a?.sales - a?.fee;
  //     let grossProfit2 = b?.sales - b?.fee;
  //     return grossProfit1 - grossProfit2;
  //   },
  //   dataIndex: "roi",
  //   render: (_, record) => (
  //     <div className="w-full flex items-center justify-center">
  //       <div className="w-full flex items-center justify-center">
  //         <span className="text-xs text-center">-</span>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   title: (
  //     <div className="flex items-center justify-center space-x-4">
  //       <span className="text-xs text-[#777777] text-center">Info</span>
  //     </div>
  //   ),
  //   dataIndex: "roi",
  //   render: (_, record) => (
  //     <div className="w-full flex items-center justify-center">
  //       <div className="w-full flex items-center justify-center">
  //         <Button
  //           onClick={() => {
  //             setRecord(record);
  //             setModal(true);
  //           }}
  //           type="link"
  //           className="text-xs text-center"
  //         >
  //           More
  //         </Button>
  //       </div>
  //     </div>
  //   ),
  // },
  // ];

  // const columns = [
  //   {
  //     title: (
  //       <div className="flex items-center space-x-4">
  //         <span className="text-xs text-[#777777]">Product</span>
  //       </div>
  //     ),
  //     filteredValue: [searchedText],
  //     onFilter: (value, record) => {
  //       return (
  //         String(record.product).toLowerCase().includes(value.toLowerCase()) ||
  //         String(record.sku).includes(value) ||
  //         String(record.tsin).includes(value)
  //       );
  //     },
  //     width: "30px",
  //     dataIndex: "product",
  //     render: (_, record) => (
  //       <div className="flex items-center">
  //         <div className="flex flex-col space-y-2">
  //           <span className="text-sm text-black">{record?.product}</span>
  //           <div className="flex items-center space-x-2">
  //             <Tooltip title="SKU">
  //               <button className="p-1 px-4 flex items-center justify-center space-x-2 bg-[#1569BD] rounded-[5px]">
  //                 <Image
  //                   alt="docs"
  //                   src={"/icons/document.svg"}
  //                   width={9}
  //                   height={12}
  //                 />
  //                 <span className="text-xs text-white">{record?.sku}</span>
  //               </button>
  //             </Tooltip>
  //             <Tooltip title="TSIN">
  //               <Link
  //                 href={"#"}
  //                 className="bg-[#0BA3A3] p-1 px-4 flex items-center justify-center space-x-2 rounded-[5px]"
  //               >
  //                 <Image
  //                   alt="documents"
  //                   src={"/icons/document.svg"}
  //                   width={9}
  //                   height={12}
  //                 />
  //                 <span className="text-xs text-white">{record?.tsin}</span>
  //                 <Image
  //                   alt="goto"
  //                   src={"/icons/goto.svg"}
  //                   width={12}
  //                   height={12}
  //                 />
  //               </Link>
  //             </Tooltip>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center space-x-4 justify-center">
  //         <span className="text-xs text-[#777777] text-center">Units Sold</span>
  //       </div>
  //     ),
  //     sorter: (a, b) => a.unitSold - b.unitSold,
  //     dataIndex: "unitSold",
  //     key: "unitsold",
  //     render: (_, record) => (
  //       <div className="w-full flex justify-center items-center">
  //         <span className="text-xs text-center">{record?.unitSold}</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center space-x-4 justify-center">
  //         <span className="text-xs text-[#777777] text-center">Sales</span>
  //       </div>
  //     ),
  //     dataIndex: "sales",
  //     sorter: (a, b) => a.sales - b.sales,
  //     render: (_, record) => (
  //       <div className="w-full flex justify-center items-center">
  //         <span className="text-xs text-center">
  //           R {record?.sales?.toFixed(2)}
  //         </span>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center justify-center space-x-4">
  //         <span className="text-xs text-[#777777] text-center">Promo</span>
  //       </div>
  //     ),
  //     dataIndex: "promo",
  //     sorter: (a, b) => a.promo - b.promo,
  //     render: (_, record) => (
  //       <div className="w-full flex items-center justify-center">
  //         <div className="w-full flex items-center justify-center">
  //           <span className="text-xs text-center">
  //             R {record?.promo?.toFixed(2)}
  //           </span>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center justify-center space-x-4">
  //         <span className="text-xs text-[#777777] text-center">
  //           Takealot Fee
  //         </span>
  //       </div>
  //     ),
  //     dataIndex: "fee",
  //     sorter: (a, b) => a.fee - b.fee,
  //     render: (_, record) => (
  //       <div className="w-full flex items-center justify-center">
  //         <div className="w-full flex items-center justify-center">
  //           <span className="text-xs text-center">
  //             R {record?.fee?.toFixed(2)}
  //           </span>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center justify-center space-x-4">
  //         <span className="text-xs text-[#777777] text-center">
  //           Cost of Goods
  //         </span>
  //       </div>
  //     ),
  //     sorter: (a, b) => a.cog - b.cog,
  //     dataIndex: "cog",
  //     render: (_, record) => (
  //       <div className="w-full flex items-center justify-center">
  //         <div className="w-full flex items-center justify-center">
  //           <span className="text-xs text-center">-</span>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center justify-center space-x-4">
  //         <span className="text-xs text-[#777777] text-center">
  //           Gross Profit
  //         </span>
  //       </div>
  //     ),
  //     dataIndex: "grossProfit",
  //     sorter: (a, b) => {
  //       let grossProfit1 = a?.sales - a?.fee;
  //       let grossProfit2 = b?.sales - b?.fee;
  //       return grossProfit1 - grossProfit2;
  //     },
  //     render: (_, record) => (
  //       <div className="w-full flex items-center justify-center">
  //         <div className="w-full flex items-center justify-center">
  //           <span className="text-xs text-center">
  //             R {(record?.sales - record?.fee)?.toFixed(2)}
  //           </span>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center justify-center space-x-4">
  //         <span className="text-xs text-[#777777] text-center">Net Profit</span>
  //       </div>
  //     ),
  //     sorter: (a, b) => {
  //       let grossProfit1 = a?.sales - a?.fee;
  //       let grossProfit2 = b?.sales - b?.fee;
  //       return grossProfit1 - grossProfit2;
  //     },
  //     dataIndex: "netProfit",
  //     render: (_, record) => (
  //       <div className="w-full flex items-center justify-center">
  //         <div className="w-full flex items-center justify-center">
  //           <span className="text-xs text-center">
  //             R {(record?.sales - record?.fee)?.toFixed(2)}
  //           </span>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center justify-center space-x-4">
  //         <span className="text-xs text-[#777777] text-center">Margin</span>
  //       </div>
  //     ),
  //     sorter: (a, b) => {
  //       let grossProfit1 = a?.sales - a?.fee;
  //       let grossProfit2 = b?.sales - b?.fee;
  //       return grossProfit1 - grossProfit2;
  //     },
  //     dataIndex: "margin",
  //     render: (_, record) => (
  //       <div className="w-full flex items-center justify-center">
  //         <div className="w-full flex items-center justify-center">
  //           <span className="text-xs text-center">-</span>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center justify-center space-x-4">
  //         <span className="text-xs text-[#777777] text-center">ROI</span>
  //       </div>
  //     ),
  //     sorter: (a, b) => {
  //       let grossProfit1 = a?.sales - a?.fee;
  //       let grossProfit2 = b?.sales - b?.fee;
  //       return grossProfit1 - grossProfit2;
  //     },
  //     dataIndex: "roi",
  //     render: (_, record) => (
  //       <div className="w-full flex items-center justify-center">
  //         <div className="w-full flex items-center justify-center">
  //           <span className="text-xs text-center">-</span>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="flex items-center justify-center space-x-4">
  //         <span className="text-xs text-[#777777] text-center">Info</span>
  //       </div>
  //     ),
  //     dataIndex: "roi",
  //     render: (_, record) => (
  //       <div className="w-full flex items-center justify-center">
  //         <div className="w-full flex items-center justify-center">
  //           <Button
  //             onClick={() => {
  //               setRecord(record);
  //               setModal(true);
  //             }}
  //             type="link"
  //             className="text-xs text-center"
  //           >
  //             More
  //           </Button>
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div className="flex flex-col space-y-10">
      <Table
        loading={isLoading || essentialsLoading}
        columns={columns}
        dataSource={data}
        id="newOrders"
        rootClassName="orders-table"
        scroll={{ x: 1500 }}
      />
      {modal && (
        <DetailsModal
          show={modal}
          close={() => {
            setModal(false);
          }}
          data={record}
          setData={setRecord}
        />
      )}
    </div>
  );
};

export default ProductsTable;
