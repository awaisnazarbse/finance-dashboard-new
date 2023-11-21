import { Checkbox, Divider, Input } from "antd";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const ProductDimensions = ({
  close,
  settingsData,
  setSettingsData,
  onSubmit,
  submitting,
}) => {
  const [data, setData] = useState({
    unitsPerBox: 50,
    boxLength: 0.78,
    boxWidth: 0.78,
    boxHeight: 1.18,
    color: "",
    size: "M",
  });
  const [unitsText, setUnitsText] = useState(false);
  const [applyToAll, setApplyToAll] = useState(false);
  const [lengthText, setLengthText] = useState(false);
  const [widthText, setWidthText] = useState(false);
  const [heightText, setHeightText] = useState(false);
  const [colorText, setColorText] = useState(false);
  const [sizeText, setSizeText] = useState(false);
  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Units per box</span>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="90"
              className="p-2"
              style={{
                borderRadius: "0",
              }}
              value={settingsData?.unitsPerBox}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  unitsPerBox: e.target.value,
                })
              }
            />
            <AiOutlineExclamationCircle
              className="hover:text-primary transition-all duration-300 cursor-pointer text-gray-500"
              size={20}
              color={unitsText ? "#F7B614" : ""}
              onClick={() => setUnitsText(!unitsText)}
            />
          </div>
        </div>
        {unitsText && (
          <span className="text-xs font-extralight">
            Number of units in a box
          </span>
        )}
      </div>
      <Divider />
      <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Box length (inches)</span>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="0"
              className="p-2"
              value={settingsData.boxLength}
              style={{
                borderRadius: "0",
              }}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  boxLength: e.target.value,
                })
              }
            />
            <AiOutlineExclamationCircle
              className="hover:text-primary transition-all duration-300 cursor-pointer text-gray-500"
              color={lengthText ? "#F7B614" : ""}
              size={20}
              onClick={() => setLengthText(!lengthText)}
            />
          </div>
        </div>
        {lengthText && (
          <span className="text-xs font-extralight">
            The longest side of the box that has a flap
          </span>
        )}
      </div>
      <Divider />
      <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Box width (inches)</span>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="10"
              className="p-2"
              value={settingsData.boxWidth}
              style={{
                borderRadius: "0",
              }}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  boxWidth: e.target.value,
                })
              }
            />
            <AiOutlineExclamationCircle
              className="hover:text-primary transition-all duration-300 cursor-pointer text-gray-500"
              color={widthText ? "#F7B614" : ""}
              size={20}
              onClick={() => setWidthText(!widthText)}
            />
          </div>
        </div>
        {widthText && (
          <span className="text-xs font-extralight">
            The shorter side of the box that has a flap
          </span>
        )}
      </div>
      <Divider />
      <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Box height (inches)</span>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="10"
              className="p-2"
              value={settingsData.boxHeight}
              style={{
                borderRadius: "0",
              }}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  boxHeight: e.target.value,
                })
              }
            />
            <AiOutlineExclamationCircle
              className="hover:text-primary transition-all duration-300 cursor-pointer text-gray-500"
              color={heightText ? "#F7B614" : ""}
              size={20}
              onClick={() => setHeightText(!heightText)}
            />
          </div>
        </div>
        {heightText && (
          <span className="text-xs font-extralight">
            The standing side of the box from top to bottom
          </span>
        )}
      </div>
      <Divider />
      <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Color</span>
          <div className="flex items-center space-x-2">
            <Input
              className="p-2"
              value={settingsData.color}
              style={{
                borderRadius: "0",
              }}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  color: e.target.value,
                })
              }
            />
            <AiOutlineExclamationCircle
              className="hover:text-primary transition-all duration-300 cursor-pointer text-gray-500"
              color={colorText ? "#F7B614" : ""}
              size={20}
              onClick={() => setColorText(!colorText)}
            />
          </div>
        </div>
        {colorText && (
          <span className="text-xs font-extralight">
            The color of a product
          </span>
        )}
      </div>
      <Divider />
      <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center w-full py-3">
          <span>Size</span>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="10"
              className="p-2"
              value={settingsData.size}
              style={{
                borderRadius: "0",
              }}
              onChange={(e) =>
                setSettingsData({
                  ...settingsData,
                  size: e.target.value,
                })
              }
            />
            <AiOutlineExclamationCircle
              className="hover:text-primary transition-all duration-300 cursor-pointer text-gray-500"
              color={sizeText ? "#F7B614" : ""}
              size={20}
              onClick={() => setSizeText(!sizeText)}
            />
          </div>
        </div>
        {sizeText && (
          <span className="text-xs font-extralight">The size of a product</span>
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

export default ProductDimensions;
