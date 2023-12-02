import { useState } from "react";
import ProductsTable from "./ProductsTable";
import TransportationCostTable from "./TransportationCostTable";
import ShipmentsTable from "./ShipmentsTable";
import Attachments from "./Attachments";
import Link from "next/link";
import { Layout } from "antd";
import { v4 as uuidv4 } from "uuid";
import ShipmentsModal from "./ShipmentsModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import purchasedOrdersApi from "@/lib/purchasedOrders";
import SaveSettingModal from "./SaveSettingModal";

const { Footer } = Layout;

const NewPurchaseOrderTabs = ({
  offers,
  shipments,
  productsData,
  setProductsData,
  shipmentsData,
  setShipmentsData,
  transportationCostData,
  setTransportationCostData,
  onSave,
  submitting,
  saveBtnDisabled,
  status,
  saveModal,
  setSaveModal,
}) => {
  const [active, setActive] = useState("Products");

  const [shipmentsModal, setShipmentsModal] = useState(false);
  const tabs = ["Products", "Transportation Cost", "Shipments", "Attachments"];

  const handleAddProduct = () => {
    const newData = {
      key: uuidv4(),
      unitsOrdered: 0,
      unitsPerBox: 0,
      boxesOrdered: 0,
      boxDimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      totalManufacturingCost: 0,
      weight: 0,
      manufacturingCostPerUnit: 0,
      transportationCostPerUnit: 0,
      totalCostPerUnit: 0,
      comment: "",
    };
    setProductsData([...productsData, newData]);
  };
  const handleAddTransportationCost = () => {
    const newData = {
      key: uuidv4(),
      costName: "",
      amount: 0,
      attributeCostToProducts: "By weight",
      comment: "",
    };
    setTransportationCostData([...transportationCostData, newData]);
  };

  const handleClick = () => {
    if (active === "Products") {
      handleAddProduct();
    } else if (active === "Transportation Cost") {
      handleAddTransportationCost();
    } else {
      setShipmentsModal(true);
    }
  };

  return (
    <div className="flex flex-col relative space-y-4">
      <div className="flex flex-col justify-between p-4 py-6 rounded-[10px] w-full bg-white">
        <div className="flex flex-col space-y-10">
          <div className="flex items-center space-x-8">
            {tabs?.map((e, i) => (
              <button
                key={i}
                className="p-1 flex items-start justify-center text-sm font-medium"
                style={{
                  color: active === e ? "#F7B614" : "black",
                  borderBottom: active === e ? "2px solid #F7B614" : "none",
                }}
                onClick={() => setActive(e)}
              >
                {e}
              </button>
            ))}
          </div>
          {active === "Products" && (
            <ProductsTable
              productsData={productsData}
              setProductsData={setProductsData}
              offers={offers}
              transportationCostData={transportationCostData}
            />
          )}
          {active === "Transportation Cost" && (
            <TransportationCostTable
              transportationCostData={transportationCostData}
              setTransportationCostData={setTransportationCostData}
            />
          )}
          {active === "Shipments" && (
            <ShipmentsTable
              shipmentsData={shipmentsData}
              setShipmentsData={setShipmentsData}
            />
          )}
          {active === "Attachments" && <Attachments />}
        </div>
      </div>
      <div
        className="flex items-center justify-between sticky bottom-0 w-full p-5 bg-white"
        style={{
          boxShadow: "0 -4px 43px -6px rgba(0,0,0,.1)",
        }}
      >
        <div>
          <button
            className="bg-[#4E91FC] focus:bg-[#4E91FC] hover:bg-[#4E91FC] w-fit text-white px-3 py-2 text-base rounded-md"
            onClick={() => handleClick()}
          >
            {active === "Products"
              ? "Add product"
              : active === "Transportation Cost"
              ? "Add cost"
              : active === "Shipments"
              ? "Link shipment"
              : "Add attachment"}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={{
              pathname: "/inventory",
              query: { tab: "Purchased Orders" },
            }}
            className="border border-gray-400 w-fit text-gray-400 px-5 py-2 text-base rounded-md"
          >
            Cancel
          </Link>
          <button
            className="bg-primary focus:bg-primary hover:bg-primary w-fit text-white px-5 py-2 text-base rounded-md"
            style={{
              cursor: saveBtnDisabled ? "not-allowed" : "pointer",
            }}
            onClick={() => {
              setSaveModal(true);
              // onSave()
            }}
            disabled={saveBtnDisabled}
          >
            Save
          </button>
        </div>
      </div>
      {shipmentsModal && (
        <ShipmentsModal
          show={shipmentsModal}
          close={() => {
            setShipmentsModal(false);
          }}
          shipments={shipments}
          setShipmentsData={setShipmentsData}
          shipmentsData={shipmentsData}
        />
      )}
      {saveModal && (
        <SaveSettingModal
          show={saveModal}
          close={() => {
            setSaveModal(false);
          }}
          cogDisabled={status === "Closed" ? false : true}
          status={status}
          submitting={submitting}
          onSave={onSave}
        />
      )}
    </div>
  );
};

export default NewPurchaseOrderTabs;
