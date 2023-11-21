import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Select, Table } from "antd";
import { CgClose } from "react-icons/cg";

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
      const found = productsData?.find((e) => e?.key === record?.key);
      let updatedData = {
        ...found,
        ...values,
      };
      let manufacturingCostPerUnit = 0;
      let boxesOrdered = 0;
      if (dataIndex === "unitsOrdered" || dataIndex === "unitsPerBox") {
        if (dataIndex === "unitsOrdered") {
          if (found?.unitsPerBox && found?.unitsPerBox !== "-") {
            boxesOrdered = values?.unitsOrdered / found?.unitsPerBox;
            updatedData.boxesOrdered = boxesOrdered;
          }
        }
        if (dataIndex === "unitsPerBox") {
          if (found?.unitsOrdered && found?.unitsOrdered !== "-") {
            boxesOrdered = found?.unitsOrdered / values?.unitsPerBox;
            updatedData.boxesOrdered = boxesOrdered;
          }
        }
      }
      if (
        dataIndex === "unitsOrdered" ||
        dataIndex === "totalManufacturingCost"
      ) {
        if (dataIndex === "unitsOrdered") {
          if (
            found?.totalManufacturingCost &&
            found?.totalManufacturingCost !== "-"
          ) {
            manufacturingCostPerUnit =
              found?.totalManufacturingCost / values?.unitsOrdered;
            updatedData.manufacturingCostPerUnit = manufacturingCostPerUnit;
          }
        }
        if (dataIndex === "totalManufacturingCost") {
          if (found?.unitsOrdered && found?.unitsOrdered !== "-") {
            manufacturingCostPerUnit =
              values?.totalManufacturingCost / found?.unitsOrdered;
            updatedData.manufacturingCostPerUnit = manufacturingCostPerUnit;
          }
        }
      }

      console.log("values", values);
      if (
        dataIndex === "boxDimensions" &&
        updatedData?.boxesOrdered &&
        updatedData?.boxesOrdered !== "-"
      ) {
        const boxD = values?.boxDimensions?.split("x");
        let cbm = 1;

        boxD?.forEach((e, i) => {
          const num = Number(e);
          cbm = cbm * num;
        });

        updatedData.cbm = (cbm / 1000000) * updatedData?.boxesOrdered;
      }

      console.log("updatedData", updatedData);
      toggleEdit();
      handleSave(updatedData);
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
      >
        <Input
          className="text-[10px] font-medium w-full"
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap flex items-center justify-center min-h-[2.5rem] border cursor-text text-right"
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
const ProductsTable = ({ productsData, setProductsData, offers }) => {
  const defaultColumns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Products
          </span>
        </div>
      ),
      dataIndex: "product",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-[10px] font-light text-black">
            <Select
              options={
                offers?.length > 0 &&
                offers?.map((offer) => ({ value: offer?.title }))
              }
              onSelect={(e) => {
                // const found = productsData?.find((e) => e?.key === record?.key)
                const offerFound = offers?.find((offer) => offer?.title === e);
                const updatedData = {
                  ...record,
                  product: offerFound,
                };

                handleSave(updatedData);
              }}
              showSearch
              value={record?.product?.title}
              showArrow={false}
              placeholder="Select product"
              className="text-[#777777] text-[10px] outline-none focus:outline-none border focus:border-none w-52"
              bordered={false}
            />
          </span>
        </div>
      ),
      width: "150px",
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Units ordered
          </span>
        </div>
      ),
      dataIndex: "unitsOrdered",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] text-right font-light text-black">
            {record?.unitsOrdered}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Units per box
          </span>
        </div>
      ),
      dataIndex: "unitsPerBox",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black">
            {record?.unitsPerBox || "-"}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Boxes ordered
          </span>
        </div>
      ),
      dataIndex: "boxesOrdered",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black">
            {record?.boxesOrdered || "-"}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Box dimensions
          </span>
        </div>
      ),
      dataIndex: "boxDimensions",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black line-clamp-1">
            {record?.boxDimensions || "LxWxH"}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">CBM</span>
        </div>
      ),
      dataIndex: "cbm",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black line-clamp-1">
            {record?.cbm || "-"}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Total manufacturing cost (R)
          </span>
        </div>
      ),
      dataIndex: "totalManufacturingCost",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black line-clamp-1">
            {record?.totalManufacturingCost || "-"}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Manufacturing cost per unit (R)
          </span>
        </div>
      ),
      dataIndex: "manufacturingCostPerUnit",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black line-clamp-1">
            {record?.manufacturingCostPerUnit || "-"}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Transportation cost per unit (R)
          </span>
        </div>
      ),
      dataIndex: "transportationCostPerUnit",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black line-clamp-1">
            {record?.transportationCostPerUnit || "-"}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Total cost per unit (R)
          </span>
        </div>
      ),
      dataIndex: "totalCostPerUnit",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black line-clamp-1">
            {record?.totalCostPerUnit || "-"}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">HS code</span>
        </div>
      ),
      dataIndex: "hsCode",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black line-clamp-1">
            {record?.hsCode || "-"}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">Comment</span>
        </div>
      ),
      dataIndex: "comment",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black line-clamp-1">
            {record?.comment || "-"}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[10px] font-light text-[#777777]">Delete</span>
        </div>
      ),
      dataIndex: "actions",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <CgClose
            className="cursor-pointer"
            onClick={() => {
              const newData = productsData?.filter(
                (e) => e?.key !== record?.key
              );
              setProductsData(newData);
            }}
          />
        </div>
      ),
    },
  ];

  const handleSave = (row) => {
    const newData = [...productsData];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setProductsData(newData);
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
        productsData,
      }),
    };
  });
  return (
    <div className="flex flex-col space-y-4 items-start">
      <Table
        id="tasks-table"
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={productsData}
        columns={columns}
        pagination={false}
        className="w-full"
      />
    </div>
  );
};
export default ProductsTable;
