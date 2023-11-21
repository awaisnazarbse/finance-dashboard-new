import offersApi from "@/lib/offers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, message } from "antd";
import { useState } from "react";
import SupplierOrder from "./SupplierOrder";
import ManufacturingAndLogistics from "./ManufacturingAndLogistics";
import Forcast from "./Forcast";
import ProductDimensions from "./ProductDimensions";
import Loader from "@/components/utils/Loader";

const ProductSettingsModal = (props) => {
  const queryClient = useQueryClient();
  const tabs = [
    "Supplier order",
    "Manufacturing & logistics",
    "Forecast",
    "Product dimensions",
  ];

  const [supplierOrderData, setSupplierOrderData] = useState({
    daysAfterNewOrder: 90,
    buffer: 0,
    supplierSku: "DEMO_SKU2",
  });

  const [manufacturingAndLogistics, setManufacturingAndLogistics] = useState({
    manufacturingTime: 0,
    shippingToPrepCenter: 0,
    shippingToFba: 0,
  });

  const [dimensions, setDimensions] = useState({
    unitsPerBox: 50,
    boxLength: 0.78,
    boxWidth: 0.78,
    boxHeight: 1.18,
    color: "",
    size: "M",
  });

  // const [settingsData, setSettingsData] = useState({
  //   supplierData: {
  //     daysAfterNewOrder: 90,
  //     buffer: 0,
  //     supplierSku: "DEMO_SKU2",
  //   },
  //   manufacturingAndLogistics: {
  //     manufacturingTime: 25,
  //     shippingToPrepCenter: 0,
  //     shippingToFba: 10,
  //   },
  //   dimensions: {
  //     unitsPerBox: 50,
  //     boxLength: 0.78,
  //     boxWidth: 0.78,
  //     boxHeight: 1.18,
  //     color: "",
  //     size: "M",
  //   },
  // });

  const [active, setActive] = useState("Supplier order");

  const mutation = useMutation(
    ["product-settings"],
    async (data) => {
      if (active === "Supplier order") {
        return await offersApi.updateSupplierOrderSettings({
          ...data,
          offer_id: props?.data?.offer_id,
        });
      } else if (active === "Manufacturing & logistics") {
        return await offersApi.updateManufacturingAndLogisticsSettings({
          ...data,
          offer_id: props?.data?.offer_id,
        });
      } else if (active === "Dimensions") {
        return await offersApi.updateDimensionsSettings({
          ...data,
          offer_id: props?.data?.offer_id,
        });
      }
    },
    {
      onError: () => {
        message.error("Something went wrong, please try again later!");
      },
      onSuccess: () => {
        message.success("Product settings updated!");
        queryClient.invalidateQueries(["inventory_planner"]);
      },
    }
  );

  const { data: productData, isLoading } = useQuery(
    ["product-settings"],
    async () => {
      const res = await offersApi.getProductSettings(props?.data?.offer_id);
      if (res) {
        if (res?.supplierOrderData) {
          setSupplierOrderData(res?.supplierOrderData);
        }
        if (res?.manufacturingAndLogistics) {
          setManufacturingAndLogistics(res?.manufacturingAndLogistics);
        }
        if (res?.dimensions) {
          setDimensions(res?.dimensions);
        }
        // setSettingsData({
        //   supplierData: {
        //     daysAfterNewOrder: res?.daysAfterNewOrder,
        //     buffer: res?.buffer,
        //     supplierSku: res?.supplierSku,
        //   },
        //   manufacturingAndLogistics: {
        //     manufacturingTime: res?.manufacturingTime,
        //     shippingToPrepCenter: res?.shippingToPrepCenter,
        //     shippingToFba: res?.shippingToFba,
        //   },
        //   dimensions: {
        //     unitsPerBox: res?.unitsPerBox,
        //     boxHeight: res?.boxHeight,
        //     boxWidth: res?.boxWidth,
        //     boxLength: res?.boxLength,
        //     color: res?.color,
        //     size: res?.size,
        //   },
        // });
        return true;
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const submitSupplierOrder = (data) => {
    console.log("data to submit", data);
    mutation.mutate(data);
  };
  const submitManufacturingAndLogistics = (data) => {
    console.log("data to submit", data);
    mutation.mutate(data);
  };
  const submitDimensions = (data) => {
    console.log("data to submit", data);
    mutation.mutate(data);
  };

  return (
    <Modal
      title="Product settings"
      open={props.show}
      footer={null}
      onCancel={() => {
        if (props?.data) {
          props?.setData(null);
        }
        props.close();
      }}
      width={700}
    >
      {isLoading ? (
        <Loader />
      ) : (
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
          {active === "Supplier order" && (
            <SupplierOrder
              close={() => props?.close()}
              onSubmit={submitSupplierOrder}
              submitting={mutation.isLoading}
              setSettingsData={setSupplierOrderData}
              settingsData={supplierOrderData}
            />
          )}
          {active === "Manufacturing & logistics" && (
            <ManufacturingAndLogistics
              onSubmit={submitManufacturingAndLogistics}
              submitting={mutation.isLoading}
              setSettingsData={setManufacturingAndLogistics}
              settingsData={manufacturingAndLogistics}
            />
          )}
          {active === "Forecast" && (
            <Forcast onSubmit={() => null} submitting={mutation.isLoading} />
          )}
          {active === "Product dimensions" && (
            <ProductDimensions
              onSubmit={submitDimensions}
              submitting={mutation.isLoading}
              setSettingsData={setDimensions}
              settingsData={dimensions}
              
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default ProductSettingsModal;
