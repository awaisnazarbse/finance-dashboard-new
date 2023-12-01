import { Checkbox, DatePicker, Modal } from "antd";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const SaveSettingModal = (props) => {
  const [cogText, setCogText] = useState(true);
  const [orderColumnText, setOrderColumnText] = useState(true);
  const [changeOrderedColumn, setChangeOrderedColumn] = useState(false);
  const [newCOG, setNewCOG] = useState(false);
  const [newBatchStartDate, setNewBatchStartDate] = useState(null);
  const [previousBatchReminder, setPreviousBatchReminder] = useState(false);

  const handleSubmit = (values) => {};
  return (
    <Modal
      title="Save settings"
      open={props.show}
      footer={null}
      onCancel={() => {
        props.close();
      }}
    >
      <div className="flex flex-col space-y-4 w-full">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full py-3">
            <Checkbox
              disabled={props?.cogDisabled}
              checked={newCOG}
              onChange={(e) => setNewCOG(e.target.checked)}
            >
              Add a new batch entry with COGs to the Products page
            </Checkbox>
            <AiOutlineExclamationCircle
              className="hover:text-primary transition-all duration-300 cursor-pointer text-gray-500"
              size={20}
              color={cogText ? "#F7B614" : ""}
              onClick={() => setCogText(!cogText)}
            />
          </div>
          {cogText && (
            <span className="text-xs font-extralight">
              This option is available only if the purchase order status is
              "Closed". A new COGS batch will be added for each product. You can
              then change the cost of goods directly on the "Products" page.
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-4 pl-10">
          <div className="flex flex-col space-y-1">
            <span
              className={`${props?.cogDisabled ? "opacity-40" : "opacity-100"}`}
            >
              Start date for the new batch
            </span>
            <DatePicker
              onChange={(e) => setNewBatchStartDate(e?.toDate())}
              className="w-[60%]"
              disabled={props?.cogDisabled}
            />
          </div>
          <Checkbox
            disabled={props?.cogDisabled}
            checked={previousBatchReminder}
            onChange={(e) => setPreviousBatchReminder(e.target.checked)}
          >
            Account for remainder of stock from previous batch
          </Checkbox>
        </div>
        <hr />
        <div className="flex flex-col">
          <div className="flex justify-between items-center w-full py-3">
            <Checkbox
              checked={changeOrderedColumn}
              onChange={(e) => setChangeOrderedColumn(e.target.checked)}
            >
              Make changes in the Ordered column on the Planner page
            </Checkbox>
            <AiOutlineExclamationCircle
              className="hover:text-primary transition-all duration-300 cursor-pointer text-gray-500"
              size={20}
              color={orderColumnText ? "#F7B614" : ""}
              onClick={() => setOrderColumnText(!orderColumnText)}
            />
          </div>
          {orderColumnText &&
            (props?.status === "Ordered" || props?.status === "Shipped" ? (
              <span className="text-xs font-extralight">
                Number of the ordered units will be add to the “Ordered” column
                on the Planner page
              </span>
            ) : (
              <span className="text-xs font-extralight">
                Number of the ordered units will be subtracted from the
                “Ordered” column on the Planner page
              </span>
            ))}
        </div>
        <div className="flex items-center justify-end space-x-2">
          <button
            className="border p-2 hover:bg-gray-200 transition-all duration-300"
            onClick={() => props?.close()}
          >
            Cancel
          </button>
          <button
            onClick={() =>
              props.onSave({
                changeOrderedColumn,
                newCOG,
                newBatchStartDate,
                previousBatchReminder,
              })
            }
            className="border border-primary p-2 px-4 bg-primary text-white"
            disabled={props?.submitting}
          >
            {props?.submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveSettingModal;
