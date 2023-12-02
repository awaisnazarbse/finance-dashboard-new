import {
  Button,
  Input,
  Table,
  Tag,
  Tooltip,
  message,
  Image as AntdImage,
  Form,
  Spin,
  Select,
  Space,
} from "antd";
import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiExport, BiImport } from "react-icons/bi";
import * as xlsx from "xlsx";
import ProductModal from "./ProductModal";
import { useAuth } from "@/context/AuthContext";
import OfferModal from "./OfferModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import offersApi from "@/lib/offers";
import COGBatchModal from "./COGBatchModal";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  handleSaveCog,
  productsData,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      // const found = productsData?.find((e) => e?.key === record?.key);
      const updatedData = {
        ...record,
        ...values,
        [dataIndex]: Number(values[dataIndex]),
      };
      toggleEdit();
      if (dataIndex === "cog") {
        handleSaveCog(updatedData);
      } else {
        handleSave(updatedData);
      }
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode =
      editable &&
      dataIndex === "cog" &&
      (record?.cogType === "By period batch" ||
        record?.cogType === "by period batch") ? (
        <div
          className="editable-cell-value-wrap flex items-center justify-center min-h-[2.5rem] cursor-text text-right"
          style={{
            paddingRight: 24,
          }}
          // onClick={toggleEdit}
        >
          {children}
        </div>
      ) : editing ? (
        <div className="w-full flex items-center">
          <Form.Item
            style={{
              margin: 0,
            }}
            name={dataIndex}
          >
            <Input
              className="text-[11px] font-medium w-[4rem] border-gray-500"
              ref={inputRef}
              onPressEnter={save}
              onBlur={save}
            />
          </Form.Item>
        </div>
      ) : (
        <div
          className="editable-cell-value-wrap flex items-center justify-center min-h-[2.5rem] cursor-text text-right"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
  }
  return <td {...restProps}>{childNode}</td>;
};

const RecordsTable = ({
  data,
  searchedText,
  isLoading,
  marketplace,
  offersCogs,
  sellerNames,
  setMarketplace,
  userApiKeys,
}) => {
  const { user } = useAuth();
  const [excelData, setExcelData] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const [cogModal, setCogModal] = useState(false);
  const [productData, setProductData] = useState(false);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();

  const updateCogTypeMutation = useMutation(
    ["cog-type"],
    async (data) => {
      return await offersApi.changeCogType(data?.offer_id, data?.cogType);
    },
    {
      onSuccess: (data) => {
        // queryClient.invalidateQueries(["offers"]);
        queryClient.setQueryData(["offers"], (existingData) => {
          if (existingData) {
            const updatedData = existingData?.offers?.map((offer) => {
              if (offer?.offer_id === data?.offer_id) {
                return { ...offer, cogType: data?.cogType };
              }
              return offer;
            });
            return { ...existingData, offers: updatedData };
          }
        });
      },
    }
  );

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeCogType = (offer_id, cogType) => {
    // if (cogType === "By period batch" || cogType === "by period batch") {
      updateCogTypeMutation.mutate({ offer_id, cogType });
    // }
  };

  const exportData = () => {
    let dataToExport = [];
    data?.forEach((d) => {
      // if (data?.cogType !== "By period batch") {
      dataToExport.push({
        offer_id: d?.offer_id,
        product: d?.title,
        sku: d?.sku,
        tsin_id: d?.tsin_id,
        selling_price: d?.selling_price,
        rrp: d?.rrp,
        cog: d?.cog,
        cogType: d?.cogType ? d?.cogType : "Constant",
      });
      // }
    });
    const worksheet = xlsx.utils.json_to_sheet(dataToExport);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Offers");
    xlsx.writeFile(workbook, "offers.xlsx");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const newData = new Uint8Array(event.target.result);
      const workbook = xlsx.read(newData, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const excelJson = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      const headers = excelJson[0];
      const rows = excelJson.slice(1);

      const dataArray = rows.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
      let dataToExport = [];
      data?.forEach((d) => {
        dataToExport.push(d);
      });
      // Find objects that have different values compared to secondDataArray
      const differentObjects = dataArray.filter((excelObj, index) => {
        const secondObj = dataToExport[index];

        // Compare values for each key
        return (
          excelObj?.selling_price !== secondObj?.selling_price ||
          excelObj?.rrp !== secondObj?.rrp
        );
      });
      const differentObjectsCOG = dataArray.filter((excelObj, index) => {
        const secondObj = dataToExport[index];

        // Compare values for each key
        return excelObj?.cog !== secondObj?.cog;
      });

      console.log("differentObjects", differentObjects);

      if (differentObjects?.length > 0) {
        differentObjects?.map(async (object) => {
          if (object?.cogType !== "By period batch") {
            await axios.patch(`/api/offers/update/${object?.offer_id}`, {
              apiKey: marketplace,
              data: object,
            });
          }
        });
        // await fetch("/api/offers/update", {
        //   body: JSON.stringify({
        //     apiKey: user?.apiKey,
        //     data: differentObjects,
        //   }),
        //   method: "PATCH",
        // });
      }

      if (differentObjectsCOG?.length > 0) {
        differentObjectsCOG?.forEach(async (object) => {
          await offersApi.addOfferCOG({
            offer_id: object?.offer_id,
            cog: object?.cog,
            title: object?.product,
          });
        });
      }
      setExcelData(dataArray);
    };

    // if()

    message.success({
      content: `Offers imported successfully`,
    });

    reader.readAsArrayBuffer(file);
  };

  const handleSellerNameFilter = (record, filterValue) => {
    console.log("filterValue", filterValue);
    const sellerName = record.seller_detail?.display_name;

    if (filterValue?.length === 0) {
      return true;
    }

    return filterValue?.includes(sellerName);
  };
  const handleStatusFilter = (record, filterValue) => {
    const status = record.status;

    console.log("filter", { status, filterValue });
    if (filterValue?.length === 0) {
      return true;
    }

    return filterValue === status;
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const defaultColumns = [
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[11px] text-[#777777]">Offer ID</span>
    //     </div>
    //   ),
    //   dataIndex: "offerId",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <span className="text-[11px] text-black">{record?.offer_id}</span>
    //     </div>
    //   ),
    //   filteredValue: [searchedText],
    //   onFilter: (value, record) => {
    //     return (
    //       String(record.title).toLowerCase().includes(value.toLowerCase()) ||
    //       String(record.sku).includes(value) ||
    //       String(record.tsin).includes(value) ||
    //       String(record.offer_id).includes(value)
    //     );
    //   },
    // },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Product</span>
        </div>
      ),
      // filteredValue: [searchedText],
      onFilter: (value, record) =>
        record?.title?.toString().toLowerCase().includes(value.toLowerCase()) ||
        record?.product_title
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        record?.sku?.toString()?.includes(value) ||
        record?.tsin_id?.toString()?.includes(value),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search title, sku or tsin..`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, "product")}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              type="primary"
              className="flex items-center"
              onClick={() => handleSearch(selectedKeys, confirm, "product")}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
                background: "#f7b614",
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1677ff" : undefined,
            fontSize: "1rem",
          }}
        />
      ),
      width: "450px",
      dataIndex: "product",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <div
            style={{
              width: "60px",
              height: "60px",
            }}
          >
            {record?.image_url && (
              <div className="w-full">
                <AntdImage alt="alt text" src={record?.image_url} />
              </div>
            )}
          </div>
          <div className="flex flex-col items-start space-y-2">
            <span className="w-72 text-[11px] text-black line-clamp-2">
              {record?.title}
            </span>
            <div className="flex items-center space-x-2">
              <div className="p-1 px-4 flex items-center justify-center space-x-2 bg-primary rounded-[5px] w-fit">
                <Image
                  alt="alt text"
                  src={"/icons/document.svg"}
                  width={9}
                  height={12}
                />
                <span className="text-[8px] text-white">{record?.sku}</span>
              </div>
              <Link
                href={`${record?.offer_url}`}
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
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">COG</span>
        </div>
      ),
      dataIndex: "cog",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span
            className="text-[11px] text-black"
            onClick={() => {
              if (
                record?.cogType === "by period batch" ||
                record?.cogType === "By period batch"
              ) {
                setCogModal(true);
                setProductData(record)
              }
            }}
          >
            {record?.cog ? `R ${record?.cog}` : "-"}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">COG Type</span>
        </div>
      ),
      dataIndex: "cogType",
      render: (_, record) => (
        <div className="w-full flex items-center cog-type">
          <Select
            options={[
              { label: "Constant", value: "Constant" },
              { label: "By period batch", value: "By period batch" },
            ]}
            placeholder={record?.cogType ? record?.cogType : "Constant"}
            bordered={false}
            style={{
              fontSize: "11px",
            }}
            size="small"
            dropdownStyle={{
              fontSize: "11px",
            }}
            onChange={(e) => handleChangeCogType(record?.offer_id, e)}
          />
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">RRP</span>
        </div>
      ),
      dataIndex: "rrp",
      editable: true,
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center text-[11px]">
            {`R ${record?.rrp}`}
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">
            Selling Price
          </span>
        </div>
      ),
      editable: true,
      dataIndex: "selling_price",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full text-[11px] flex items-center justify-center">
            R {record?.selling_price}
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">
            Stock Availability
          </span>
        </div>
      ),
      dataIndex: "stockAvailability",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          {record?.status === "Buyable" ? (
            <Tooltip title="Buyable">
              <span className="text-[#00C851] bg-green-200 w-8 h-8 rounded-full flex items-center justify-center text-[11px]">
                B
              </span>
            </Tooltip>
          ) : (
            <Tooltip title="Not Buyable">
              <span className="text-[#979ea5] bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-[11px]">
                NB
              </span>
            </Tooltip>
          )}
        </div>
      ),
      filters: [
        {
          text: "Buyable",
          value: "Buyable",
        },
        {
          text: "Not Buyable",
          value: "Not Buyable",
        },
      ],
      onFilter: (value, record) => handleStatusFilter(record, value),
    },
    {
      title: (
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[11px] text-[#777777] text-center">
            Fullfilment
          </span>
        </div>
      ),
      dataIndex: "fullfilment",
      render: (_, record) => {
        let dcStock = 0;
        record?.stock_at_takealot?.map((e) => {
          dcStock += e?.quantity_available;
        });
        return (
          <div className="w-full flex justify-center items-center">
            <Tag
              className="text-[11px] px-5 py-1"
              style={{
                background: "#EA7866",
              }}
              color="white"
            >
              {dcStock > 0 ? "IN STOCK" : "LEADTIME"}
            </Tag>
          </div>
        );
      },
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">Seller</span>
        </div>
      ),
      dataIndex: "seller",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-[11px] text-black text-center">
            {record?.seller_detail ? record?.seller_detail?.display_name : "-"}
          </span>
        </div>
      ),
      filters: sellerNames?.map((e) => {
        return {
          text: e,
          value: e,
        };
      }),
      onFilter: (value, record) => handleSellerNameFilter(record, value),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">
            Reviews
          </span>
        </div>
      ),
      dataIndex: "review",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-[11px] text-black text-center">
            {record?.reviews ? record?.reviews?.count : "-"}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777] text-center">Rating</span>
        </div>
      ),
      dataIndex: "rejected",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center space-x-2 justify-center">
            {record?.reviews ? (
              <>
                <Image
                  alt="alt text"
                  src={"/icons/star.svg"}
                  width={18}
                  height={17}
                />
                <span className="text-[11px] text-black">
                  {record?.reviews?.star_rating}
                </span>
              </>
            ) : (
              "-"
            )}
          </div>
        </div>
      ),
    },
  ];

  const handleSave = async (row) => {
    await axios.patch(`/api/offers/update/${row?.offer_id}`, {
      apiKey: marketplace,
      data: { selling_price: row?.selling_price, rrp: row?.rrp },
    });

    queryClient.setQueryData(["offers"], (existingData) => {
      if (existingData) {
        const updatedData = existingData?.offers?.map((offer) => {
          if (offer?.offer_id === row?.offer_id) {
            return {
              ...offer,
              selling_price: row?.selling_price,
              rrp: row?.rrp,
            };
          }
          return offer;
        });
        return { ...existingData, offers: updatedData };
      }
    });
  };
  const handleSaveCog = async (row) => {
    await offersApi.addOfferCOG({
      cog: row?.cog,
      offer_id: row?.offer_id,
      title: row?.title,
    });

    queryClient.setQueryData(["offers"], (existingData) => {
      if (existingData) {
        const updatedData = existingData?.offers?.map((offer) => {
          if (offer?.offer_id === row?.offer_id) {
            return { ...offer, cog: row?.cog };
          }
          return offer;
        });
        return { ...existingData, offers: updatedData };
      }
    });
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        handleSaveCog,
        // productsData,
      }),
    };
  });

  return (
    <div className="p-5">
      <div className="bg-white rounded-[10px] p-3 w-full flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:items-center md:space-x-2">
            <Button
              className="p-6 w-fit md:w-auto flex items-center justify-center space-x-2 border-0"
              style={{
                background: "rgba(21, 105, 189, 0.06)",
              }}
              onClick={() => setOfferModal(true)}
            >
              Add COG
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              id="upload"
              hidden
              onChange={handleFileChange}
            />
            <Button
              className="p-6 w-fit md:w-auto flex items-center justify-center space-x-2 border-0"
              style={{
                background: "rgba(21, 105, 189, 0.06)",
              }}
              onClick={() => handleButtonClick()}
            >
              <BiImport size={20} />
              <span className="text-[11px] text-black">Import</span>
            </Button>
            <Button
              className="p-6 w-fit md:w-auto flex items-center justify-center space-x-2 border-0"
              style={{
                background: "rgba(21, 105, 189, 0.06)",
              }}
              onClick={() => exportData()}
            >
              <BiExport size={20} />
              <span className="text-[11px] text-black">Export</span>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex px-1 md:px-4 md:space-x-2 items-center border border-[#C2BDBD] rounded-md">
              <Image
                alt="alt text"
                src="/icons/market.svg"
                width={18}
                height={18}
              />
              <Select
                placeholder="All market places"
                options={[
                  { label: "All market places", value: "All market places" },
                  ...userApiKeys?.map((key) => {
                    return { label: key?.seller_name, value: key?.apiKey };
                  }),
                ]}
                value={marketplace}
                onChange={(e) => setMarketplace(e)}
                suffixIcon={
                  <Image
                    alt="alt text"
                    src="/icons/downarrow.svg"
                    width={13}
                    height={5}
                  />
                }
                bordered={false}
              />
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          id="newOrders"
          rootClassName="orders-table"
          components={components}
          scroll={{ x: 1500 }}
          loading={isLoading}
        />
      </div>
      {productModal && (
        <ProductModal
          show={productModal}
          close={() => {
            setProductModal(false);
          }}
          data={productData}
          setData={setProductData}
        />
      )}
      {offerModal && (
        <OfferModal
          show={offerModal}
          close={() => {
            setOfferModal(false);
          }}
          offers={offersCogs}
          data={productData}
          setData={setProductData}
        />
      )}
      {cogModal && (
        <COGBatchModal
          show={cogModal}
          close={() => {
            setCogModal(false);
          }}
          // offers={offersCogs}
          data={productData}
          setData={setProductData}
        />
      )}
    </div>
  );
};

export default RecordsTable;
