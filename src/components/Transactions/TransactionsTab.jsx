import TransactionCards from "./TransactionCards";
import TransactionsTable from "./TransactionsTable";

const TransactionsTab = ({
  data,
  pendingBalance,
  pageSummary,
  setCurrentPage,
  currentPage,
  setStartDate,
  setEndDate,
  setDuration,
  loading,
  balancesLoading,
  balances,
  disbursment,
  graphData
}) => {
  return (
    <>
      <TransactionCards
        // currentBalance={
        //   data?.length > 0
        //     ? data?.find(
        //         (e) =>
        //           e?.transaction_type?.description ===
        //             "Customer Order Payment" && e?.balance > 0
        //       )?.balance
        //     : "-"
        // }
        currentBalance={balances?.current?.toFixed(2)}
        availableBalance={balances?.available?.toFixed(2)}
        pendingBalance={pendingBalance}
        loading={balancesLoading}
      />
      <TransactionsTable
        data={data}
        pageSummary={pageSummary}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setDuration={setDuration}
        loading={loading}
        disbursment={disbursment}
        graphData={graphData}
      />
    </>
  );
};

export default TransactionsTab;
