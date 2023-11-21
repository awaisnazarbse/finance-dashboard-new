import { useAuth } from "@/context/AuthContext";
import { Table } from "antd";
import DetailsModal from "./DetailsModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import offersApi from "@/lib/offers";

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
}) => {
  const { user } = useAuth();

  const { data, isLoading } = useQuery(
    ["products-sales3", dates, productTitle, marketplace],
    async () => {
      const res = await axios.post(
        // "http://localhost:3000/sales/products_sales",
        "https://finance-dashboard-server-smoky.vercel.app/sales/products_sales",
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
          const cog = await offersApi.getOfferCOG(offer?.offer_id);
          return { ...offer, cog };
        })
      );
      // const res = await axios.post(
      //   `https://finance-dashboard-server-smoky.vercel.app/sales/products_sales`,
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
      return offersWithCOG;
    },
    {
      enabled: !!user,
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
