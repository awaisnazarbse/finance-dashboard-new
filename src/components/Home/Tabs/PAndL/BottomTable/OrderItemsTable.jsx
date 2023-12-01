import { Table } from "antd";
import OrderItemsDetailsModal from "./OrderItemsDetailsModal";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import offersApi from "@/lib/offers";
import expensesApi from "@/lib/expense";
import dayjs from "dayjs";

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
  bottomTableDates,
  bottomTableDuration,
  setOrderItemsData,
}) => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery(
    ["order-items", bottomTableDates, productTitle, marketplace],
    async () => {
      const res = await axios.post(
        // `http://localhost:3000/sales`,
        `https://finance-dashboard-server-smoky.vercel.app/sales`,
        {
          apiKey: user?.apiKey,
          startDate: bottomTableDates[0],
          endDate: bottomTableDates[1],
          duration: bottomTableDuration,
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
          const expense = await expensesApi.getExpensesByOfferId(
            offer?.offer_id,
            {
              start: dayjs(bottomTableDates[0]).format("DD MMM YYYY"),
              end: dayjs(bottomTableDates[1]).format("DD MMM YYYY"),
            }
          );
          return { ...offer, cog, expense };
        })
      );
      setOrderItemsData(offersWithCOG);
      return offersWithCOG;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="">
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
