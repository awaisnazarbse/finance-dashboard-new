import { Table } from "antd";
import OrderItemsDetailsModal from "./OrderItemsDetailsModal";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import offersApi from "@/lib/offers";

const OrderItemsTable = ({
  searchedText,
  dates,
  columns,
  record,
  setRecord,
  modal,
  setModal,
  duration,
  productTitle,
  marketplace,
  userApiKeys,
}) => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery(
    ["order-items", dates, productTitle, marketplace],
    async () => {
      const res = await axios.post(
        // `http://localhost:3000/sales`,
        `https://finance-dashboard-server-smoky.vercel.app/sales`,
        {
          apiKey: user?.apiKey,
          startDate: dates[0],
          endDate: dates[1],
          duration,
          productTitle,
          marketplace,
          userApiKeys,
          uid: user?.uid,
        }
      );
      const offersWithCOG = await Promise.all(
        res.data?.map(async (offer) => {
          // const cog = 0
          const cog = await offersApi.getOfferCOG(offer?.offer_id);
          return { ...offer, cog };
        })
      );
      return offersWithCOG;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="flex flex-col md:mt-10 space-y-10">
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        id="newOrders"
        rootClassName="orders-table"
        scroll={{ x: 1600 }}
      />
      {modal && (
        <OrderItemsDetailsModal
          show={modal}
          close={() => {
            setModal(false);
          }}
          data={record}
          setData={setRecord}
        />
      )}
    </div>
  );
};

export default OrderItemsTable;
