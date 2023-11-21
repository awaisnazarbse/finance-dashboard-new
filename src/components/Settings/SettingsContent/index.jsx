import dynamic from "next/dynamic";

const ApiInfo = dynamic(() => import("./ApiInfo"));
const UserDetails = dynamic(() => import("./UserDetails"));

const SettingsContent = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 items-start">
      <ApiInfo data={data} />
      <UserDetails />
    </div>
  );
};

export default SettingsContent;
