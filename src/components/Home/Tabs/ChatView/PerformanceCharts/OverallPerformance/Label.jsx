const Label = ({ color, title }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 rounded-full" style={{ background: color }}></div>
      <span className="text-[10px] text-black">{title}</span>
    </div>
  );
};

export default Label;
