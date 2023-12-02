import { Avatar, Button, Layout, Select } from "antd";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";
import { AiOutlineBell } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NotificationBox from "./NotificationBox";
import { useEffect, useRef, useState } from "react";

const { Header } = Layout;

const DashboardHeader = ({
  setCollapsed,
  collapsed,
  title,
  tabs,
  active,
  setActive,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [notificationsDropdown, setNotificationsDropdown] = useState(false);
  // const { data, isLoading } = useQuery(["notifications"], async () => {
  //   const res = await axios.get("/api/notifications");
  //   console.log("nots", res.data);
  //   return res.data;
  // });
  const notificationRef = useRef();

  const handleOutsideClick = (e) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(e.target)
    ) {
      setNotificationsDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  
  return (
    <Header className="flex items-center justify-between w-full px-4 bg-[#353535]">
      <div className="flex space-x-4 md:space-x-8 items-center">
        <Image
          alt="alt text"
          src={"/icons/menu-icon.svg"}
          width={31}
          height={31}
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer"
          style={{
            cursor: "pointer",
          }}
        />
        {router.pathname === "/shipments/[id]" ||
        router.pathname === "/inventory/purchased-orders/[id]" ? (
          <Link
            href={{
              pathname: "/inventory",
              query: {
                tab:
                  router.pathname === "/shipments/[id]"
                    ? "Shipments"
                    : "Purchased Orders",
              },
            }}
          >
            <BiArrowBack size={20} />
          </Link>
        ) : null}
        <span className="hidden md:block text-black font-bold text-base">
          {title}
        </span>
        <div className="hidden md:flex items-center space-x-4">
          {tabs?.map((e, i) => (
            <Button
              style={{
                color: active === e ? "#F7B614" : "#777777",
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
        {tabs?.length > 0 && (
          <Select
            options={tabs?.map((e, i) => {
              return { label: e, value: e };
            })}
            placeholder={active}
            suffixIcon={
              <Image
                alt="alt text"
                src="/icons/downarrow.svg"
                width={10}
                height={10}
              />
            }
            onChange={(e) => {
              setActive(e);
            }}
            bordered={false}
            className="block md:hidden w-32 bg-white rounded-sm"
          />
        )}
      </div>
      <div
        className="flex items-center space-x-4"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {isLoading ? null : (
          <div className="relative h-10" ref={notificationRef}>
            <AiOutlineBell
              onClick={() => setNotificationsDropdown(!notificationsDropdown)}
              size={33}
              color="#7C7C7C"
              className="cursor-pointer"
            />
            <div className="w-2 h-2 absolute top-2 right-1 rounded-full bg-red-600"></div>
            {/* {notificationsDropdown && (
              <div className="absolute top-10 right-2 p-3 bg-white shadow-sm flex flex-col z-[999] w-80 h-96 space-y-4 rounded-md overflow-y-auto">
                <span className="text-lg font-bold">Notifications</span>
                {[]?.map((e) => {
                  return <NotificationBox data={e} />;
                })}
              </div>
            )} */}
          </div>
        )}

        <div className="flex items-center justify-center">
          <Avatar
            icon={<UserOutlined />}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            src={user?.img}
            size={40}
          ></Avatar>
        </div>
      </div>
    </Header>
  );
};

export default DashboardHeader;
