import { useAuth } from "@/context/AuthContext";
import { Table } from "antd";
import DetailsModal from "./DetailsModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import userApi from "@/lib/user";
import offersApi from "@/lib/offers";
import purchasedOrdersApi from "@/lib/purchasedOrders";
import expensesApi from "@/lib/expense";
import dayjs from "dayjs";

const ProductsTable = ({
  startDate,
  endDate,
  // data,
  loading = false,
  searchedText,
  selectedColumns,
  columns,
  record,
  modal,
  setRecord,
  setModal,
  setData,
  productTitle,
  duration,
  marketplace,
  essentialsLoading,
}) => {
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery(
    [
      "products-sales1",
      startDate,
      endDate,
      productTitle,
      duration,
      marketplace,
    ],
    async () => {
      let response;
      if (marketplace === "All market places") {
        console.log("product sales if running");

        const userApiKeys = await userApi?.getActiveUserAPIKeys(user?.uid);
        response = await axios.post(
          // "http://localhost:3000/sales/products_sales",
          "https://api.sellermetrics.co.za/sales/products_sales",
          // "https://api.sellermetrics.co.za/sales/products_sales",
          {
            apiKey: user?.apiKey,
            startDate: startDate,
            endDate: endDate,
            productTitle,
            duration,
            marketplace,
            userApiKeys,
          }
        );
      } else {
        console.log("product sales else running");
        response = await axios.post(
          // "http://localhost:3000/sales/products_sales",
          "https://api.sellermetrics.co.za/sales/products_sales",
          // "https://api.sellermetrics.co.za/sales/products_sales",
          {
            apiKey: user?.apiKey,
            startDate: startDate,
            endDate: endDate,
            productTitle,
            duration,
            marketplace,
          }
        );
      }
      // console.log("product data", response.data);
      const offersWithCOG = await Promise.all(
        response.data?.map(async (offer) => {
          const cog = 0;
          // const cog = await offersApi.getOfferCOG(offer?.offer_id);
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
      setData(offersWithCOG);
      return offersWithCOG;
    },
    {
      enabled: !!user || !!marketplace,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="flex flex-col space-y-10">
      <Table
        loading={isLoading || essentialsLoading}
        columns={columns}
        dataSource={data}
        id="newOrders"
        rootClassName="orders-table"
        scroll={{ x: 1500 }}
      />
      {modal && (
        <DetailsModal
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

export default ProductsTable;
