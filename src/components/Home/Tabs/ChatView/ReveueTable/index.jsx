import RecordsTable from "./RecordsTable";

const RevenueTable = ({
  sales,
  setTodaySalesData,
  orderItems,
  searchedText,
  startDate,
  endDate,
  productTitle,
  duration,
  marketplace
}) => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 p-5">
      <RecordsTable
        searchedText={searchedText}
        startDate={startDate}
        endDate={endDate}
        productTitle={productTitle}
        duration={duration}
        marketplace={marketplace}
      />
    </div>
  );
};

export default RevenueTable;
