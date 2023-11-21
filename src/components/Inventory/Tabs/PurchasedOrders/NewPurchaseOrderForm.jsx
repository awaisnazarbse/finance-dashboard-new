import { DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";

const NewPurchaseOrderForm = ({
  suppliers,
  userApiKeys,
  basicData,
  setBasicData,
}) => {
  return (
    <div className="flex flex-col space-y-8">
      <div className="grid w-full grid-cols-4 space-x-2">
        <div className="flex flex-col space-y-2">
          <span>Date</span>
          <DatePicker
            placeholder="Date"
            className="w-full"
            value={
              basicData?.date ? dayjs(basicData?.date, "DD/MM/YYYY") : null
            }
            format={"DD/MM/YYYY"}
            onChange={(e) =>
              setBasicData({
                ...basicData,
                date: dayjs(e),
              })
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Estimated arrival date</span>
          <DatePicker
            placeholder="Estimated arrival date"
            className="w-full"
            onChange={(e) =>
              setBasicData({
                ...basicData,
                estimatedArrivalDate: dayjs(e),
              })
            }
            value={
              basicData?.estimatedArrivalDate
                ? dayjs(basicData?.estimatedArrivalDate, "DD/MM/YYYY")
                : null
            }
            format={"DD/MM/YYYY"}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Status</span>
          <Select
            options={[
              { label: "Draft", value: "Draft" },
              { label: "Ordered", value: "Ordered" },
              { label: "Shipped", value: "Shipped" },
              { label: "Closed", value: "Closed" },
            ]}
            placeholder="Status"
            onChange={(e) => setBasicData({ ...basicData, status: e })}
            value={basicData?.status}
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Supplier</span>
          <Select
            options={suppliers?.map((e) => {
              return {
                label: e?.supplierName,
                value: e?.id,
              };
            })}
            placeholder="Supplier"
            className="w-full"
            value={basicData?.supplier}
            onChange={(e) =>
              setBasicData({
                ...basicData,
                supplier: e,
              })
            }
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-4 space-x-2">
        <div className="flex flex-col space-y-2">
          <span>Marketplace</span>
          <Select
            options={userApiKeys?.map((e) => {
              return {
                label: e?.seller_name,
                value: e?.apiKey,
              };
            })}
            value={basicData?.marketplace}
            onChange={(e) =>
              setBasicData({
                ...basicData,
                marketplace: e,
              })
            }
            placeholder="Marketplace"
            className="w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Carrier</span>
          <Input
            placeholder="Carrier"
            className="w-full"
            value={basicData?.carrier}
            onChange={(e) =>
              setBasicData({
                ...basicData,
                carrier: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Tracking number</span>
          <Input
            placeholder="Tracking number"
            className="w-full"
            value={basicData?.trackingNumber}
            onChange={(e) =>
              setBasicData({
                ...basicData,
                trackingNumber: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <span>Comments</span>
          <Input
            placeholder="Comments"
            value={basicData?.comments}
            className="w-full"
            onChange={(e) =>
              setBasicData({
                ...basicData,
                comments: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NewPurchaseOrderForm;
