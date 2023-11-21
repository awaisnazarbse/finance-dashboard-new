import { Button, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductsTable from "./ProductsTable";
import dynamic from "next/dynamic";
import { TbTable } from "react-icons/tb";
import * as xlsx from "xlsx";
import { BsDownload } from "react-icons/bs";
import ColumnsModal from "./ColumnsModal";
import dayjs from "dayjs";
import formatDateRange from "@/utils/formatDateRange";
import { useQuery } from "@tanstack/react-query";
import purchasedOrdersApi from "@/lib/purchasedOrders";
import offersApi from "@/lib/offers";
import ProductDetails from "@/components/utils/ProductDetails";

const OrderItemsTable = dynamic(() => import("./OrderItemsTable"));

const RecordsTable = ({
  searchedText,
  dates,
  productTitle,
  marketplace,
  startDate,
  endDate,
}) => {
  const { data: essentials, isLoading: essentialsLoading } = useQuery(
    ["essentials"],
    async () => {
      const purchaseOrders = await purchasedOrdersApi.getPurchasedOrderByStatus(
        "Ordered"
      );
      const manufacturingAndLogistics =
        await offersApi.getManufacturingAndLogistics();
      const supplierOrderSettings = await offersApi.getSupplierOrderSettings();

      return {
        purchaseOrders,
        manufacturingAndLogistics,
        supplierOrderSettings,
      };
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const [active, setActive] = useState("Products");
  const [record, setRecord] = useState(null);
  const columnModalRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Product</span>
        </div>
      ),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.product).toLowerCase().includes(value.toLowerCase()) ||
          String(record.sku).includes(value) ||
          String(record.tsin).includes(value)
        );
      },
      width: "350px",
      dataIndex: "product",
      render: (_, record) => (
        <ProductDetails record={record} essentials={essentials} />
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">
            Units Sold
          </span>
        </div>
      ),
      width: "150px",
      sorter: (a, b) => a.unitSold - b.unitSold,
      dataIndex: "unitSold",
      key: "unitsold",
      render: (_, record) => (
        <div className="w-full flex justify-center items-center">
          <span className="text-[11px] text-center">{record?.unitSold}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">Sales</span>
        </div>
      ),
      dataIndex: "sales",
      sorter: (a, b) => a.sales - b.sales,
      render: (_, record) => (
        <div className="w-full flex justify-center items-center">
          <span className="text-[11px] text-center">
            R {record?.sales?.toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">Promo</span>
        </div>
      ),
      dataIndex: "promo",
      sorter: (a, b) => a.promo - b.promo,
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              R {record?.promo?.toFixed(2)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">
            Takealot Fee
          </span>
        </div>
      ),
      dataIndex: "fee",
      sorter: (a, b) => a.fee - b.fee,
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              R {record?.fee?.toFixed(2)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">
            Cost of Goods
          </span>
        </div>
      ),
      sorter: (a, b) => a.cog - b.cog,
      dataIndex: "cog",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              R {record?.cog * Number(record?.unitSold)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">
            Gross Profit
          </span>
        </div>
      ),
      dataIndex: "grossProfit",
      sorter: (a, b) => {
        let grossProfit1 = a?.sales - a?.fee;
        let grossProfit2 = b?.sales - b?.fee;
        return grossProfit1 - grossProfit2;
      },
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              R {(record?.sales - record?.fee)?.toFixed(2)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">
            Net Profit
          </span>
        </div>
      ),
      sorter: (a, b) => {
        let grossProfit1 = a?.sales - a?.fee;
        let grossProfit2 = b?.sales - b?.fee;
        return grossProfit1 - grossProfit2;
      },
      dataIndex: "netProfit",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              R {(record?.sales - record?.fee - record?.cog)?.toFixed(2)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">Margin</span>
        </div>
      ),
      sorter: (a, b) => {
        let grossProfit1 = a?.sales - a?.fee;
        let grossProfit2 = b?.sales - b?.fee;
        return grossProfit1 - grossProfit2;
      },
      dataIndex: "margin",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              {(
                ((record?.sales - record?.fee - record?.cog) / record?.sales) *
                100
              ).toFixed(2)}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">ROI</span>
        </div>
      ),
      sorter: (a, b) => {
        let grossProfit1 = a?.sales - a?.fee;
        let grossProfit2 = b?.sales - b?.fee;
        return grossProfit1 - grossProfit2;
      },
      dataIndex: "roi",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              {Number(
                ((record?.sales - record?.fee) / record?.cog) * 100
              ).toFixed(2)}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">Info</span>
        </div>
      ),
      dataIndex: "roi",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <Button
              onClick={() => {
                setRecord(record);
                setModal(true);
              }}
              type="link"
              className="text-[11px] text-center"
            >
              More
            </Button>
          </div>
        </div>
      ),
    },
  ]);
  const [orderItemColumns, setOrderItemColumns] = useState([
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Order Number</span>
        </div>
      ),
      dataIndex: "orderId",
      render: (_, record, index) => (
        <div className="w-full flex flex-col space-y-1">
          <span className="text-[11px] text-[#777777] ">
            {record?.order_id}
          </span>
          <span className="text-[11px] text-black">{record?.order_date}</span>
          <div
            className="p-1 flex items-center justify-center w-fit rounded-[5px]"
            style={{
              background:
                record?.sale_status === "Shipped to Customer"
                  ? "#00C851"
                  : "#EA7866",
            }}
          >
            <span className="text-[8px] text-white">{record?.sale_status}</span>
          </div>
        </div>
      ),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.order_id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.sale_status)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.product_title)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.sku).toLowerCase().includes(value.toLowerCase()) ||
          String(record.tsin).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Product</span>
        </div>
      ),
      width: "400px",
      dataIndex: "product",
      render: (_, record) => (
        <div className="flex items-center">
          {/* {record?.image_url && (
            <Image src={record?.image_url} width={60} height={60} />
          )} */}
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] text-black line-clamp-2">
              {record?.product_title}
            </span>
            <div className="flex items-center space-x-2">
              <Tooltip title="SKU">
                <button className="p-1 px-4 flex items-center justify-center space-x-2 bg-primary rounded-[5px]">
                  <Image
                    alt="document"
                    src={"/icons/document.svg"}
                    width={9}
                    height={12}
                  />
                  <span className="text-[8px] text-white">{record?.sku}</span>
                </button>
              </Tooltip>
              <Tooltip title="TSIN">
                <Link
                  href={record?.takealot_url}
                  className="bg-[#353535] p-1 px-4 flex items-center justify-center space-x-2 rounded-[5px]"
                >
                  <Image
                    alt="doc"
                    src={"/icons/document.svg"}
                    width={9}
                    height={12}
                  />
                  <span className="text-[8px] text-white">{record?.tsin}</span>
                  <Image
                    alt="goto"
                    src={"/icons/goto.svg"}
                    width={12}
                    height={12}
                  />
                </Link>
              </Tooltip>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">
            Units Sold
          </span>
        </div>
      ),
      dataIndex: "unitSold",
      render: (_, record) => (
        <div className="w-full flex justify-center items-center">
          <span className="text-[11px] text-center">{record?.quantity}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">Sales</span>
        </div>
      ),
      dataIndex: "sales",
      render: (_, record) => (
        <div className="w-full flex justify-center items-center">
          <span className="text-[11px] text-center">
            R {record?.selling_price?.toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">Promo</span>
        </div>
      ),
      dataIndex: "promo",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              {record?.promotion
                ? "R " + record?.selling_price?.toFixed(2)
                : "-"}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">
            Takealot Fee
          </span>
        </div>
      ),
      dataIndex: "fee",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              R {record?.total_fee?.toFixed(2)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">
            Cost of Goods
          </span>
        </div>
      ),
      dataIndex: "cog",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              R {record?.cog * Number(record?.quantity)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">
            Gross Profit
          </span>
        </div>
      ),
      dataIndex: "grossProfit",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              R {(record?.selling_price - record?.total_fee)?.toFixed(2)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">
            Net Profit
          </span>
        </div>
      ),
      dataIndex: "netProfit",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              R {(record?.selling_price - record?.total_fee)?.toFixed(2)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">ROI</span>
        </div>
      ),
      dataIndex: "roi",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <span className="text-[11px] text-center">
              {Number(
                ((record?.selling_price -
                  record?.total_fee) /
                  record?.cog) *
                  100
              ).toFixed(2)}
              %
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">Info</span>
        </div>
      ),
      dataIndex: "roi",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <Button
              onClick={() => {
                setRecord(record);
                setModal(true);
              }}
              type="link"
              className="text-[11px] text-center"
            >
              More
            </Button>
          </div>
        </div>
      ),
    },
  ]);
  const [selectedColumns, setSelectedColumns] = useState([
    "Unit sold",
    "Refunds",
    "Sales",
    "Promo",
    "Sellable returns",
    "Refund cost",
    "Takealot fee",
    "Cost of goods",
    "Gross profit",
    "Margin",
    "ROI",
  ]);
  const tabs = ["Products", "Order Items"];
  const [columnsModal, setColumnsModal] = useState(false);

  const exportData = () => {
    if (active === "Products") {
      let dataToExport = [];
      data?.forEach((d) => {
        let data = {
          Product: d?.product,
        };

        if (selectedColumns?.includes("Sales")) {
          data["Sales (R)"] = d?.sales?.toFixed(2);
        }
        if (selectedColumns?.includes("Promo")) {
          data["Promo (R)"] = d?.promo?.toFixed(2);
        }
        if (selectedColumns?.includes("Takealot fee")) {
          data["Takealot fee (R)"] = d?.fee?.toFixed(2);
        }
        if (selectedColumns?.includes("Cost of goods")) {
          data["Cost of goods (R)"] = "-";
        }
        if (selectedColumns?.includes("Gross profit")) {
          data["Gross profit (R)"] = d?.sales?.toFixed(2) - d?.fee?.toFixed(2);
        }
        if (selectedColumns?.includes("Margin")) {
          data["Margin (%)"] = (((d?.sales - d?.fee) / d?.sales) * 100).toFixed(
            2
          );
        }
        if (selectedColumns?.includes("ROI")) {
          data["ROI (R)"] = "-";
        }

        // console.log("data", data);

        dataToExport.push(data);
      });
      const worksheet = xlsx.utils.json_to_sheet(dataToExport);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Products");
      xlsx.writeFile(workbook, "products_sales.xlsx");
    } else if (active === "Order Items") {
      let dataToExport = [];
      orderItems?.sales?.forEach((d) => {
        let data = {
          ["Order number"]: d?.order_id,
          ["Order date"]: d?.order_date,
          ["Order status"]: d?.sale_status,
          Product: d?.product_title,
        };

        if (selectedColumns?.includes("Sales")) {
          data["Sales (R)"] = d?.selling_price?.toFixed(2);
        }
        if (selectedColumns?.includes("Promo")) {
          data["Promo (R)"] = d?.promotion
            ? "R " + d?.selling_price?.toFixed(2)
            : "-";
        }
        if (selectedColumns?.includes("Takealot fee")) {
          data["Takealot fee (R)"] = d?.total_fee?.toFixed(2);
        }
        if (selectedColumns?.includes("Cost of goods")) {
          data["Cost of goods (R)"] = "-";
        }
        if (selectedColumns?.includes("Gross profit")) {
          data["Gross profit (R)"] = (d?.selling_price - d?.total_fee)?.toFixed(
            2
          );
        }
        if (selectedColumns?.includes("Margin")) {
          data["Margin (%)"] = (
            ((d?.selling_price - d?.total_fee) / d?.selling_price) *
            100
          ).toFixed(2);
        }
        if (selectedColumns?.includes("ROI")) {
          data["ROI (R)"] = "-";
        }

        // console.log("data", data);

        dataToExport.push(data);
      });
      // let dataToExport = [];
      // orderItems?.sales?.forEach((d) => {
      //   dataToExport.push({
      //     order_number: d?.order_id,
      //     order_date: d?.order_date,
      //     status: d?.sale_status,
      //     product: d?.product_title,
      //     unit_sold: d?.quantity,
      //     sales: (d?.selling_price)?.toFixed(2),
      //     promo: d?.promotion
      //       ? "R " + (d?.selling_price)?.toFixed(2)
      //       : "-",
      //     takealot_fee: d?.total_fee?.toFixed(2),
      //     cost_of_goods: "-",
      //     gross_profit: (
      //       d?.selling_price -
      //       d?.total_fee
      //     )?.toFixed(2),
      //     net_profit: (d?.selling_price - d?.total_fee)?.toFixed(
      //       2
      //     ),
      //     roi: "-",
      //   });
      // });
      const worksheet = xlsx.utils.json_to_sheet(dataToExport);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "OrderItems");
      xlsx.writeFile(workbook, "order_items.xlsx");
    }
  };

  const handleOutsideClick = (e) => {
    if (columnModalRef.current && !columnModalRef.current.contains(e.target)) {
      setColumnsModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="flex flex-col justify-between bg-white p-4 py-6 rounded-[10px] w-full"
      style={{
        boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <span className="font-medium text-sm">
            {formatDateRange(startDate, endDate, true)}
          </span>
          {tabs?.map((e, i) => (
            <button
              key={i}
              className="p-1 flex items-start justify-center text-sm font-medium"
              style={{
                color: active === e ? "#F7B614" : "black",
              }}
              onClick={() => setActive(e)}
            >
              {e}
            </button>
          ))}
        </div>
        <div className="flex px-4 py-2 space-x-6 items-center rounded-md w-fit">
          <BsDownload
            size={25}
            className="cursor-pointer"
            onClick={() => exportData()}
            color="#777777"
          />
          <div className="relative" ref={columnModalRef}>
            <TbTable
              size={25}
              className="cursor-pointer"
              color="#777777"
              onClick={() => setColumnsModal(!columnsModal)}
            />
            {columnsModal && (
              <div className="absolute top-0 right-10 z-50">
                <ColumnsModal
                  selectedColumns={selectedColumns}
                  setSelectedColumns={setSelectedColumns}
                  setColumns={setColumns}
                  searchedText={searchedText}
                  setRecord={setRecord}
                  setModal={setModal}
                  setOrderItemColumns={setOrderItemColumns}
                  essentials={essentials}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-10">
        {active === "Products" && (
          <ProductsTable
            dates={dates}
            searchedText={searchedText}
            selectedColumns={selectedColumns}
            columns={columns}
            setRecord={setRecord}
            setModal={setModal}
            record={record}
            modal={modal}
            productTitle={productTitle}
            marketplace={marketplace}
            startDate={startDate}
            endDate={endDate}
            essentialsLoading={essentialsLoading}
          />
        )}
        {active === "Order Items" && (
          <OrderItemsTable
            dates={dates}
            searchedText={searchedText}
            columns={orderItemColumns}
            setRecord={setRecord}
            setModal={setModal}
            record={record}
            modal={modal}
            productTitle={productTitle}
            marketplace={marketplace}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </div>
    </div>
  );
};

export default RecordsTable;
