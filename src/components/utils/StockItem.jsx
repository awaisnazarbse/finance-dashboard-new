const StockItem = ({ title, value }) => {
  return (
    <div className="flex flex-col justify-between">
      <span className="text-white text-xs font-extralight opacity-60">{title}</span>
      <span className="text-white text-sm">{value}</span>
    </div>
  );
};

export default StockItem;
