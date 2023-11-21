import { Checkbox, Divider, Input, message } from "antd";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const SupplierOrder = ({
  close,
  settingsData,
  setSettingsData,
  onSubmit,
  submitting,
}) => {
  const [daysAfterNewOrderText, setDaysAfterNewOrderText] = useState(false);
  const [bufferText, setBufferText] = useState(false);
  const [supplierText, setSupplierText] = useState(false);
  const [applyToAll, setApplyToAll] = useState(false);

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Target stock range after new order (days)</span>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="90"
              className="p-2"
              style={{
                borderRadius: "0",
              }}
              value={settingsData?.daysAfterNewOrder}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  daysAfterNewOrder: Number(e.target.value),
                })
              }
            />
            <AiOutlineExclamationCircle
              className="hover:text-primary transition-all duration-300 cursor-pointer text-gray-500"
              size={20}
              color={daysAfterNewOrderText ? "#F7B614" : ""}
              onClick={() => setDaysAfterNewOrderText(!daysAfterNewOrderText)}
            />
          </div>
        </div>
        {daysAfterNewOrderText && (
          <span className="text-xs font-extralight">
            When placing a new order, for how many days of selling should the
            new inventory be sufficient? In other words, this parameter
            describes how often you'd like to reorder.
          </span>
        )}
      </div>
      <Divider />
      <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Buffer (days)</span>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="0"
              className="p-2"
              value={settingsData?.buffer}
              style={{
                borderRadius: "0",
              }}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  buffer: Number(e.target.value),
                })
              }
            />
            <AiOutlineExclamationCircle
              className="hover:text-primary transition-all duration-300 cursor-pointer text-gray-500"
              color={bufferText ? "#F7B614" : ""}
              size={20}
              onClick={() => setBufferText(!bufferText)}
            />
          </div>
        </div>
        {bufferText && (
          <span className="text-xs font-extralight">
            When calculating the time to reorder and the recommended amount to
            reorder, sellerboard will make sure your stock doesn't fall below
            this buffer.
          </span>
        )}
      </div>
      <Divider />
      {/* <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Supplier SKU/MPN</span>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="DEMO_SKU2"
              className="p-2"
              value={settingsData?.supplierSku}
              style={{
                borderRadius: "0",
              }}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  supplierSku: e.target.value,
                })
              }
            />
            <AiOutlineExclamationCircle
              className="hover:text-primary transition-all duration-300 cursor-pointer text-gray-500"
              color={supplierText ? "#F7B614" : ""}
              size={20}
              onClick={() => setSupplierText(!supplierText)}
            />
          </div>
        </div>
        {supplierText && (
          <span className="text-xs font-extralight">
            Enter the supplier SKU or manufacturer part number. This value will
            be visible in the Purchase Order export file.
          </span>
        )}
      </div>
      <Divider /> */}
      <div className="flex w-full items-center justify-between">
        <Checkbox
          checked={applyToAll}
          onChange={(e) => setApplyToAll(e.target.checked)}
        >
          Apply to all
        </Checkbox>
        <div className="flex items-center space-x-2">
          <button
            className="border p-2 hover:bg-gray-200 transition-all duration-300"
            onClick={() => close()}
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSubmit({
                ...settingsData,
                applyToAll,
              })
            }
            disabled={submitting}
            className="border border-primary p-2 bg-primary text-white"
          >
            {submitting ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrder;
