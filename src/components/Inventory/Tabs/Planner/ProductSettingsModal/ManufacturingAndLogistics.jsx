import { Checkbox, Divider, Input } from "antd";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const ManufacturingAndLogistics = ({
  close,
  settingsData,
  setSettingsData,
  onSubmit,
  submitting
}) => {
  const [daysAfterNewOrderText, setDaysAfterNewOrderText] = useState(false);
  const [bufferText, setBufferText] = useState(false);
  const [supplierText, setSupplierText] = useState(false);
  const [applyToAll, setApplyToAll] = useState(false);

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Manufaturing time (days)</span>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="90"
              className="p-2"
              style={{
                borderRadius: "0",
              }}
              value={settingsData.manufacturingTime}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  manufacturingTime: Number(e.target.value),
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
            How many days does it take to manufacture the product?
          </span>
        )}
      </div>
      <Divider />
      {/* <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Shipping to Prep Center (days)</span>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="0"
              className="p-2"
              value={settingsData.shippingToPrepCenter}
              style={{
                borderRadius: "0",
              }}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  shippingToPrepCenter: Number(e.target.value),
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
            How many days does the shipping take from your supplier to your prep
            center
          </span>
        )}
      </div>
      <Divider /> */}
      <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Shipping (days)</span>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="10"
              className="p-2"
              value={settingsData.shippingToFba}
              style={{
                borderRadius: "0",
              }}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  shippingToFba: Number(e.target.value),
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
            How many days does it take to ship the inventory from your prep
            center to the FBA warehouse (OR from the supplier to the FBA
            warehouse if you do not use a prep center)?
          </span>
        )}
      </div>
      <Divider />
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

export default ManufacturingAndLogistics;
