import { Input, Select } from "antd";
import Image from "next/image";

const TopBar = ({ setSearchedText, userApiKeys, marketplace, setMarketplace }) => {
  return (
    <div className="bg-white flex space-x-2 items-center justify-between w-full p-3">
      <div className="flex items-center space-x-2">
        <Input
          prefix={
            <Image
              alt="alt text"
              src="/icons/search.svg"
              width={15}
              height={15}
            />
          }
          onChange={(e) => setSearchedText(e.target.value)}
          placeholder="Search product, offer id, tsin, sku..."
          className="py-[.3rem] px-2 w-auto md:w-96 text-[#777777] text-base outline-none focus:outline-none border-none focus:border-none"
          style={{
            background: "rgba(21, 105, 189, 0.06)",
          }}
          styles={{
            input: {
              border: "none",
              background: "transparent",
            },
          }}
        />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex px-1 md:px-4 md:space-x-2 items-center border border-[#C2BDBD] rounded-md">
          <Image
            alt="alt text"
            src="/icons/market.svg"
            width={18}
            height={18}
          />
          <Select
            placeholder="All market places"
            options={[
              { label: "All market places", value: "All market places" },
              ...userApiKeys?.map((key) => {
                return { label: key?.seller_name, value: key?.apiKey };
              }),
            ]}
            value={marketplace}
            onChange={(e) => setMarketplace(e)}
            suffixIcon={
              <Image
                alt="alt text"
                src="/icons/downarrow.svg"
                width={13}
                height={5}
              />
            }
            bordered={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
