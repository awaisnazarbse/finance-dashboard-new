import Card from "./Card";
import { MdAccountBalanceWallet } from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { SiCashapp } from "react-icons/si";

const TransactionCards = ({ currentBalance, pendingBalance }) => {
  return (
    <div className="grid grid-cols-1 space-y-2 md:space-y-0 md:grid-cols-3 md:space-x-4 p-5 w-full">
      <Card
        title={"Current Balance"}
        amount={`R ${Number(currentBalance)?.toFixed(2)}`}
        icon={<MdAccountBalanceWallet size={35} color="gray" />}
      />
      <Card
        title={"Pending Balance"}
        amount={`R ${Number(pendingBalance)?.toFixed(2)}`}
        icon={<CgSandClock size={35} color="gray" />}
      />
      <Card
        title={"Available Balance"}
        amount={`R ${(Number(currentBalance) - Number(pendingBalance)).toFixed(
          2
        )}`}
        icon={<SiCashapp size={35} color="gray" />}
      />
    </div>
  );
};

export default TransactionCards;
