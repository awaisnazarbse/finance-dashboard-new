const CardRow = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between">
      {data?.map((e, i) => (
        <div className="flex flex-col space-y-2">
          <span className="text-[10px] sm:text-xs text-[#777777]">
            {e?.title}
          </span>
          <span className="text-[12px] sm:text-xs font-medium">{e?.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CardRow;
