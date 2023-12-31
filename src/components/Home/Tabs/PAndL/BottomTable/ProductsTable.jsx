import { useAuth } from "@/context/AuthContext";
import { Table } from "antd";
import DetailsModal from "./DetailsModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import offersApi from "@/lib/offers";
import dayjs from "dayjs";
import expensesApi from "@/lib/expense";

const ProductsTable = ({
  dates,
  // data,
  searchedText,
  selectedColumns,
  columns,
  record,
  modal,
  setRecord,
  setModal,
  duration,
  productTitle,
  marketplace,
  userApiKeys,
  essentialsLoading,
  bottomTableDates,
  bottomTableDuration,
  setProductsData,
}) => {
  const { user } = useAuth();

  const { data, isLoading } = useQuery(
    ["products-sales3", bottomTableDates, productTitle, marketplace],
    async () => {
      const res = await axios.post(
        // "http://localhost:3000/sales/products_sales",
        "https://api.sellermetrics.co.za/sales/products_sales",
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
      // const res = await axios.post(
      //   `https://api.sellermetrics.co.za/sales/products_sales`,
      //   {
      //     apiKey: user?.apiKey,
      //     startDate: dates[0],
      //     endDate: dates[1],
      //     duration,
      //     productTitle,
      //     marketplace,
      //     userApiKeys,
      //     uid: user?.uid,
      //   }
      // );
      setProductsData(offersWithCOG);
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
