import { Button } from "antd";

const Tab = ({ tabs, active, setActive }) => {
  return (
    <div className="flex items-center bg-white">
      <div className="flex items-center md:space-x-5 mt-5">
        {tabs?.map((e, i) => (
          <Button
            style={{
              color: active === e ? "#0D2AAB" : "black",
              fontWeight: 500,
              fontSize: ".8rem",
            }}
            key={i}
            type="link"
            onClick={() => setActive(e)}
          >
            {e}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Tab;
