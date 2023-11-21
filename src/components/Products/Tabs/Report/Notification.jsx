import Image from "next/image";

const Notification = ({setShowNotification}) => {
  
  return (
    <div className="px-5 pt-5">
      <div className="bg-white rounded-[10px] p-5 w-full flex items-start justify-between">
        <span className="text-xs">
          In this section you can download reports in a spreadsheet format. This
          can be information from the dashboard (e.g. profit and loss by day by
          product) or lists of your orders, etc.
        </span>
        <Image
         alt="alt text"
          src={"/icons/cross.svg"}
          className="cursor-pointer"
          width={9}
          height={9}
          onClick={() => setShowNotification(false)}
        />
      </div>
    </div>
  );
};

export default Notification;
