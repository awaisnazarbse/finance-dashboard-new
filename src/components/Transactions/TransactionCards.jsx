import Card from "./Card";
import { MdAccountBalanceWallet } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { SiCashapp } from "react-icons/si";
import TextSkeletonSingle from "../utils/TextSkeletonSingle";

const TransactionCards = ({
  currentBalance,
  pendingBalance,
  loading,
  availableBalance,
}) => {
  return (
    <div className="grid grid-cols-1 space-y-2 md:space-y-0 md:grid-cols-3 md:space-x-4 p-5 w-full">
      <Card
        title={"Current Balance"}
        amount={loading ? <TextSkeletonSingle /> : `R ${currentBalance}`}
        icon={<MdAccountBalanceWallet size={35} color="gray" />}
      />
      <Card
        title={"Pending Balance"}
        amount={
          loading ? (
            <TextSkeletonSingle />
          ) : (
            `R ${Number(pendingBalance)?.toFixed(2)}`
          )
        }
        icon={<CgSandClock size={35} color="gray" />}
      />
      <Card
        title={"Available Balance"}
        amount={loading ? <TextSkeletonSingle /> : `R ${availableBalance}`}
        icon={<SiCashapp size={35} color="gray" />}
      />
    </div>
  );
};

export default TransactionCards;
