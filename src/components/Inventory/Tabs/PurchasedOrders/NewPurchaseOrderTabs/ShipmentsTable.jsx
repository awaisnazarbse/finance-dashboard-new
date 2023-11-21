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
  shipmentsData,
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
      const found = shipmentsData?.find((e) => e?.key === record?.key);
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
          className="text-lg font-medium w-full"
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
const ShipmentsTable = ({ shipmentsData, setShipmentsData }) => {
  const defaultColumns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Shipment ID
          </span>
        </div>
      ),
      dataIndex: "shipment_id",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] text-right font-light text-black">
            {record?.shipment_id}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">Status</span>
        </div>
      ),
      dataIndex: "status",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black">
            {record?.purchase_order_data?.status}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Closing date
          </span>
        </div>
      ),
      dataIndex: "due_date",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-[10px] font-light text-black">
            {record?.due_date?.date}
          </span>
        </div>
      ),
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
              const newData = shipmentsData?.filter(
                (e) => e?.key !== record?.key
              );
              setShipmentsData(newData);
            }}
          />
        </div>
      ),
    },
  ];

  const handleSave = (row) => {
    const newData = [...shipmentsData];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setShipmentsData(newData);
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
        shipmentsData,
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
        dataSource={shipmentsData}
        columns={columns}
        pagination={false}
        className="w-full"
      />
    </div>
  );
};
export default ShipmentsTable;
