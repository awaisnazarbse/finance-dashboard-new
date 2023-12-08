import dayjs from "dayjs";

const NotificationBox = ({ data }) => {
  return (
    <div className="flex flex-col space-y-1 border-b-2">
      <span className="text-sm font-semibold">{data?.message}</span>
      <span className="opacity-70 text-xs">
        {dayjs(data?.date_created).format("YYYY-MM-DD HH:mm:ss")}
      </span>
    </div>
  );
};

export default NotificationBox;
