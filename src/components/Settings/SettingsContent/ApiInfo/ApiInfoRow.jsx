const ApiInfoRow = ({ label, value }) => {
  return (
    <div className="flex items-start space-x-2">
      <span className="text-sm font-semibold">{label}:</span>
      <span className="text-sm text-[#777777] overflow-hidden max-w-xs">{value}</span>
    </div>
  );
};

export default ApiInfoRow;
