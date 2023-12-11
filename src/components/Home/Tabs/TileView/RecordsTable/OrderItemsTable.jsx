import { Table } from "antd";
import OrderItemsDetailsModal from "./OrderItemsDetailsModal";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import userApi from "@/lib/user";
import offersApi from "@/lib/offers";
import expensesApi from "@/lib/expense";
import dayjs from "dayjs";

const OrderItemsTable = ({
  dates,
  columns,
  record,
  setRecord,
  modal,
  setModal,
  productTitle,
  marketplace,
  startDate,
  endDate,
  setData
}) => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery(
    ["order-items", startDate, endDate, productTitle, marketplace],
    async () => {
      let res;
      if (marketplace === "All market places") {
        const userApiKeys = await userApi.getActiveUserAPIKeys(user?.uid);
        res = await axios.post(
          // `http://localhost:3000/sales`,
          `https://api.sellermetrics.co.za/sales`,
          {
            apiKey: user?.apiKey,
            startDate,
            endDate,
            productTitle,
            marketplace,
            userApiKeys,
          }
        );
      } else {
        res = await axios.post(
          // `http://localhost:3000/sales`,
          `https://api.sellermetrics.co.za/sales`,
          {
            apiKey: user?.apiKey,
            startDate,
            endDate,
            productTitle,
            marketplace,
          }
        );
      }
      const offersWithCOG = await Promise.all(
        res.data?.map(async (offer) => {
          // const cog = 0;
          const cog = await offersApi.getOfferCOG(offer?.offer_id);
          const expense = await expensesApi.getExpensesByOfferId(
            offer?.offer_id,
            {
              start: dayjs(startDate).format("DD MMM YYYY"),
              end: dayjs(endDate).format("DD MMM YYYY"),
            }
          );
          return { ...offer, cog, expense };
        })
      );
      console.log("offersWithCOG",offersWithCOG)
      setData(offersWithCOG)
      return offersWithCOG;
    },
    {
      enabled: !!user || !!marketplace,
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
