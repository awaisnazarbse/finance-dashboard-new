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
  transportationCostData,
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
      const found = transportationCostData?.find((e) => e?.key === record?.key);
      const updatedData = {
        ...found,
        ...values,
      };
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
const TransportationCostTable = ({
  transportationCostData,
  setTransportationCostData,
  offers,
}) => {
  const defaultColumns = [
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[10px] font-light text-[#777777]">
    //         Products
    //       </span>
    //     </div>
    //   ),
    //   dataIndex: "product",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center">
    //       <span className="text-[10px] font-light text-black">
    //         <Select
    //           options={
    //             offers?.length > 0 &&
    //             offers?.map((offer) => ({ value: offer?.title }))
    //           }
    //           onSelect={(e) => {
    //             // const found = transportationCostData?.find((e) => e?.key === record?.key)
    //             const updatedData = {
    //               ...record,
    //               product: e,
    //             };

    //             handleSave(updatedData);
    //           }}
    //           showSearch
    //           value={record?.product}
    //           showArrow={false}
    //           placeholder="Select product"
    //           className="text-[#777777] text-[10px] outline-none focus:outline-none border focus:border-none w-52"
    //           bordered={false}
    //         />
    //       </span>
    //     </div>
    //   ),
    //   width: "150px",
    // },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Cost name
          </span>
        </div>
      ),
      dataIndex: "costName",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] text-right font-light text-black">
            {record?.costName}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">Amount</span>
        </div>
      ),
      dataIndex: "amount",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black">
            {record?.amount}
          </span>
        </div>
      ),
      editable: true,
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Currency
          </span>
        </div>
      ),
      dataIndex: "currency",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <Select
            options={[
              { label: "$", value: "$" },
              { label: "R", value: "R" },
            ]}
            className="text-[#777777] text-[10px] outline-none focus:outline-none border focus:border-none w-52"
            value={record?.currency}
            onSelect={(e) => {
              const updatedData = {
                ...record,
                currency: e,
              };

              handleSave(updatedData);
            }}
            bordered={false}
          />
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Attribute cost to products
          </span>
        </div>
      ),
      dataIndex: "attributeCostToProducts",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <Select
            options={[
              { label: "By weight", value: "By weight" },
              {
                label: "By manufacturing cost",
                value: "By manufacturing cost",
              },
            ]}
            className="text-[#777777] text-[10px] outline-none focus:outline-none border focus:border-none w-52"
            value={record?.attributeCostToProducts}
            onSelect={(e) => {
              const updatedData = {
                ...record,
                attributeCostToProducts: e,
              };

              handleSave(updatedData);
            }}
            bordered={false}
          />
        </div>
      ),
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
              const newData = transportationCostData?.filter(
                (e) => e?.key !== record?.key
              );
              setTransportationCostData(newData);
            }}
          />
        </div>
      ),
    },
  ];

  const handleSave = (row) => {
    const newData = [...transportationCostData];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setTransportationCostData(newData);
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
        transportationCostData,
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
        dataSource={transportationCostData}
        columns={columns}
        pagination={false}
        className="w-full"
      />
    </div>
  );
};
export default TransportationCostTable;
