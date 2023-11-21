import { Input } from "antd";

const InputField = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-base text-black">{label}</span>
      <Input
        placeholder={placeholder}
        className="p-3 border placeholder:text-base placeholder:text-[#777777] border-[#1569BD] rounded-[5px] text-[#777777]"
        style={{
          background: "rgba(21, 105, 189, 0.06)",
        }}
      />
    </div>
  );
};

export default InputField;
