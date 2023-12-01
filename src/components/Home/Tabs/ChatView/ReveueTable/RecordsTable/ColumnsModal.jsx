import ProductDetails from "@/components/utils/ProductDetails";
import { Button, Checkbox, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";

const ColumnsModal = ({
  setSelectedColumns,
  selectedColumns,
  setColumns,
  searchedText,
  setRecord,
  setModal,
  setOrderItemColumns,
  essentials,
}) => {
  const options = [
    {
      label: "Sales",
      value: "Sales",
    },
    {
      label: "Unit sold",
      value: "Unit sold",
    },
    {
      label: "Promo",
      value: "Promo",
    },
    {
      label: "Takealot fee",
      value: "Takealot fee",
    },
    {
      label: "Expense",
      value: "Expense",
    },
    {
      label: "Refund cost",
      value: "Refund cost",
    },
    {
      label: "Refunds",
      value: "Refunds",
    },
    {
      label: "Gross profit",
      value: "Gross profit",
    },
    {
      label: "Cost of goods",
      value: "Cost of goods",
    },
    {
      label: "Net profit",
      value: "Net profit",
    },
    {
      label: "Margin",
      value: "Margin",
    },
    {
      label: "ROI",
      value: "ROI",
    },
  ];

  const handleOnChange = (e) => {
    setSelectedColumns(e);
    let newColumns = [
      {
        title: (
          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-[#777777]">Product</span>
          </div>
        ),
        filteredValue: [searchedText],
        onFilter: (value, record) => {
          return (
            String(record.product)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(record.sku).includes(value) ||
            String(record.tsin).includes(value)
          );
        },
        width: "400px",
        dataIndex: "product",
        render: (_, record) => (
          <ProductDetails record={record} essentials={essentials} />
        ),
        fixed: "left",
      },
    ];
    let newOrderItemColumns = [
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
              <span className="text-[8px] text-white">
                {record?.sale_status}
              </span>
            </div>
          </div>
        ),
        filteredValue: [searchedText],
        onFilter: (value, record) => {
          return (
            String(record.order_id)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
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
        fixed: "left",
        width: "150px",
      },
      {
        title: (
          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-[#777777]">Product</span>
          </div>
        ),
        width: "350px",
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
                    href={"#"}
                    className="bg-[#353535] p-1 px-4 flex items-center justify-center space-x-2 rounded-[5px]"
                  >
                    <Image
                      alt="doc"
                      src={"/icons/document.svg"}
                      width={9}
                      height={12}
                    />
                    <span className="text-[8px] text-white">
                      {record?.tsin}
                    </span>
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
        fixed: "left",
      },
    ];
    if (e?.includes("Unit sold")) {
      newColumns.push({
        title: (
          <div className="flex items-center space-x-4 justify-center">
            <span className="text-[11px] text-[#777777] text-center">
              Units Sold
            </span>
          </div>
        ),
        sorter: (a, b) => a.unitSold - b.unitSold,
        dataIndex: "unitSold",
        key: "unitsold",
        render: (_, record) => (
          <div className="w-full flex justify-center items-center">
            <span className="text-[11px] text-center">{record?.unitSold}</span>
          </div>
        ),
      });

      newOrderItemColumns.push({
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
      });
    }
    if (e?.includes("Expense")) {
      newColumns.push({
        title: (
          <div className="flex items-center space-x-4 justify-center">
            <span className="text-[11px] text-[#777777] text-center">
              Expense
            </span>
          </div>
        ),
        sorter: (a, b) => a.expense - b.expense,
        dataIndex: "expense",
        key: "expense",
        render: (_, record) => (
          <div className="w-full flex justify-center items-center">
            <span className="text-[11px] text-center">
              {record?.expense ? `R ${record?.expense}` : "-"}
            </span>
          </div>
        ),
      });

      newOrderItemColumns.push({
        title: (
          <div className="flex items-center space-x-4 justify-center">
            <span className="text-[11px] text-[#777777] text-center">
              Expense
            </span>
          </div>
        ),
        dataIndex: "expense",
        render: (_, record) => (
          <div className="w-full flex justify-center items-center">
            <span className="text-[11px] text-center">
              {record?.expense ? `R ${record?.expense}` : "-"}
            </span>
          </div>
        ),
      });
    }

    if (e?.includes("Sales")) {
      newColumns.push({
        title: (
          <div className="flex items-center space-x-4 justify-center">
            <span className="text-[11px] text-[#777777] text-center">
              Sales
            </span>
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
      });

      newOrderItemColumns.push({
        title: (
          <div className="flex items-center space-x-4 justify-center">
            <span className="text-[11px] text-[#777777] text-center">
              Sales
            </span>
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
      });
    }

    if (e?.includes("Promo")) {
      newColumns.push({
        title: (
          <div className="flex items-center justify-center space-x-4">
            <span className="text-[11px] text-[#777777] text-center">
              Promo
            </span>
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
      });

      newOrderItemColumns.push({
        title: (
          <div className="flex items-center justify-center space-x-4">
            <span className="text-[11px] text-[#777777] text-center">
              Promo
            </span>
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
      });
    }

    if (e?.includes("Takealot fee")) {
      newColumns.push({
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
      });

      newOrderItemColumns.push({
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
      });
    }

    if (e?.includes("Refunds")) {
      newColumns.push({
        title: (
          <div className="flex items-center justify-center space-x-4">
            <span className="text-[11px] text-[#777777] text-center">
              Refunds
            </span>
          </div>
        ),
        dataIndex: "refundedUnits",
        sorter: (a, b) => a.refundedUnits - b.refundedUnits,
        render: (_, record) => (
          <div className="w-full flex items-center justify-center">
            <div className="w-full flex items-center justify-center">
              <span className="text-[11px] text-center">
                {record?.refundedUnits}
              </span>
            </div>
          </div>
        ),
      });

      newOrderItemColumns.push({
        title: (
          <div className="flex items-center justify-center space-x-4">
            <span className="text-[11px] text-[#777777] text-center">
              Refunds
            </span>
          </div>
        ),
        dataIndex: "refundedUnits",
        render: (_, record) => (
          <div className="w-full flex items-center justify-center">
            <div className="w-full flex items-center justify-center">
              <span className="text-[11px] text-center">
                {record?.refundedUnits}
              </span>
            </div>
          </div>
        ),
      });
    }

    if (e?.includes("Refund cost")) {
      newColumns.push({
        title: (
          <div className="flex items-center justify-center space-x-4">
            <span className="text-[11px] text-[#777777] text-center">
              Refund cost
            </span>
          </div>
        ),
        dataIndex: "refundCost",
        sorter: (a, b) => a.refundCost - b.refundCost,
        render: (_, record) => (
          <div className="w-full flex items-center justify-center">
            <div className="w-full flex items-center justify-center">
              <span className="text-[11px] text-center">
                R {record?.refundCost}
              </span>
            </div>
          </div>
        ),
      });

      newOrderItemColumns.push({
        title: (
          <div className="flex items-center justify-center space-x-4">
            <span className="text-[11px] text-[#777777] text-center">
              Refund cost
            </span>
          </div>
        ),
        dataIndex: "refundCost",
        render: (_, record) => (
          <div className="w-full flex items-center justify-center">
            <div className="w-full flex items-center justify-center">
              <span className="text-[11px] text-center">
                {record?.refundCost}
              </span>
            </div>
          </div>
        ),
      });
    }

    if (e?.includes("Cost of goods")) {
      newColumns.push({
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
                R {(record?.cog * Number(record?.unitSold)).toFixed(2)}
              </span>
            </div>
          </div>
        ),
      });

      newOrderItemColumns.push({
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
                R {(record?.cog * Number(record?.quantity)).toFixed(2)}
              </span>
            </div>
          </div>
        ),
      });
    }

    if (e?.includes("Gross profit")) {
      newColumns.push({
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
      });

      newOrderItemColumns.push({
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
                R{(record?.selling_price - record?.total_fee)?.toFixed(2)}
              </span>
            </div>
          </div>
        ),
      });
    }

    if (e?.includes("Net profit")) {
      newColumns.push({
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
                R {(record?.sales - record?.fee)?.toFixed(2)}
              </span>
            </div>
          </div>
        ),
      });

      newOrderItemColumns.push({
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
                R{(record?.selling_price - record?.total_fee)?.toFixed(2)}
              </span>
            </div>
          </div>
        ),
      });
    }

    if (e?.includes("Margin")) {
      newColumns.push({
        title: (
          <div className="flex items-center justify-center space-x-4">
            <span className="text-[11px] text-[#777777] text-center">
              Margin
            </span>
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
                  ((record?.sales - record?.fee - record?.cog) /
                    record?.sales) *
                  100
                ).toFixed(2)}
                %
              </span>
            </div>
          </div>
        ),
      });
    }

    if (e?.includes("ROI")) {
      newColumns.push({
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
      });

      newOrderItemColumns.push({
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
                  ((record?.selling_price * record?.quantity -
                    record?.total_fee) /
                    record?.cog) *
                    100
                ).toFixed(2)}
                %
              </span>
            </div>
          </div>
        ),
      });
    }

    newColumns.push({
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
    });

    newOrderItemColumns.push({
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
    });

    setColumns(newColumns);
    setOrderItemColumns(newOrderItemColumns);
  };

  return (
    <div
      className="flex flex-col space-y-4 bg-white shadow-lg p-4 rounded-lg w-64"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
    >
      <h1 className="text-lg font-semibold">Columns</h1>
      <hr />
      <Checkbox.Group
        defaultValue={selectedColumns}
        options={options}
        className="text-xl flex flex-col space-y-2"
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
};

export default ColumnsModal;
