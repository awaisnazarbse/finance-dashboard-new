import TextSkeleton from "@/components/utils/TextSkeleton";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import axios from "axios";

const DetailsModal = (props) => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery(
    ["shipment-detail"],
    async () => {
      const response = await axios.post(
        `/api/inventory/shipments/${props?.id}`,
        {
          apiKey: user?.apiKey,
        }
      );
      console.log("shipment details", response.data);
      return response.data;
    },
    {
      enabled: !!user,
    }
  );

  return (
    <Modal
      title={isLoading ? <TextSkeleton /> : data?.shipment?.reference}
      open={props.show}
      footer={null}
      onCancel={() => {
        props.close();
      }}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2 items-center justify-center">
          <span className="text-lg font-semibold">Details</span>
          <div className="w-full flex items-center justify-between space-x-6">
            <div className="flex flex-col">
              <span className="font-semibold">ID</span>
              <span>{data?.shipment?.shipment_id}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Due Date</span>
              <span>{data?.shipment?.due_date?.date}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Shipped</span>
              <span>{data?.shipment?.shipped ? "Yes" : "No"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Warehouse</span>
              <span>{data?.shipment?.warehouse?.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Facility</span>
              <span>{data?.shipment?.facility?.code}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Tracking</span>
              <span>{data?.shipment?.tracking_info}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailsModal;
