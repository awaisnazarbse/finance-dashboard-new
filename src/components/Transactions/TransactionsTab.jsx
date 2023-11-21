import TransactionCards from "./TransactionCards";
import TransactionsTable from "./TransactionsTable";

const TransactionsTab = ({
  data,
  pendingBalance,
  pageSummary,
  setCurrentPage,
  currentPage,
}) => {
  return (
    <>
      <TransactionCards
        currentBalance={data?.length > 0 ? data[0]?.balance : "-"}
        pendingBalance={pendingBalance}
      />
      <TransactionsTable
        data={data}
        pageSummary={pageSummary}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default TransactionsTab;
