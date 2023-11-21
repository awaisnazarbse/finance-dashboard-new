import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { RiRefreshFill } from "react-icons/ri";
import { useRouter } from "next/router";
import Image from "next/image";
import { BiSolidBank } from "react-icons/bi";
import { MdInventory } from "react-icons/md";

const { Sider } = Layout;

const Sidebar = ({ role, collapsed, setCollapsed }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);

  useEffect(() => {
    if (router.pathname) {
      if (current !== router.pathname) {
        setCurrent(router.pathname);
      }
    }
  }, [router, current]);

  const items = [
    {
      key: "/",
      icon: (
        <Image
          src={
            router.pathname === "/"
              ? "/icons/sidebar-icons/home-yellow.svg"
              : "/icons/sidebar-icons/home-gray.svg"
          }
          alt="dashboard-icon"
          width={15}
          height={15}
        />
      ),
      label: (
        <Link
          href={"/"}
          className="font-normal text-sm font-poppins text-white"
        >
          Dashboard
        </Link>
      ),
    },
    {
      key: "/products",
      icon: (
        <Image
          src={
            router.pathname === "/products"
              ? "/icons/sidebar-icons/products-yellow.svg"
              : "/icons/sidebar-icons/products-gray.svg"
          }
          alt="products-icon"
          width={20}
          height={20}
        />
      ),
      label: (
        <Link
          href={"/products"}
          className="font-normal text-sm font-poppins text-white"
        >
          Products
        </Link>
      ),
    },
    {
      key: "/sales",
      icon: (
        <Image
          src={
            router.pathname === "/sales"
              ? "/icons/sidebar-icons/sales-yellow.svg"
              : "/icons/sidebar-icons/sales-gray.svg"
          }
          alt="sales-icon"
          width={15}
          height={15}
        />
      ),
      label: (
        <Link
          href={"/sales"}
          className="font-normal text-sm font-poppins text-white"
        >
          Sales
        </Link>
      ),
    },
    {
      key: "/inventory",
      icon: (
       <MdInventory size={18} />
      ),
      label: (
        <Link
          href={"/inventory"}
          className="font-normal text-sm font-poppins text-white"
        >
          Inventory
        </Link>
      ),
    },
    {
      key: "/transactions",
      icon: <BiSolidBank size={18} />,
      label: (
        <Link
          href={"/transactions"}
          className="font-normal text-sm font-poppins text-white"
        >
          Transactions
        </Link>
      ),
    },
    {
      key: "/buybox-tracker",
      icon: (
        <Image
          src={
            router.pathname === "/buybox-tracker"
              ? "/icons/sidebar-icons/buybox-yellow.svg"
              : "/icons/sidebar-icons/buybox-gray.svg"
          }
          alt="buyboxtracker-icon"
          width={15}
          height={15}
        />
      ),
      label: (
        <Link
          href={"/buybox-tracker"}
          className="font-normal text-sm font-poppins text-white"
        >
          Buybox Tracker
        </Link>
      ),
    },
    {
      key: "/settings",
      icon: (
        <Image
          src={
            router.pathname === "/settings"
              ? "/icons/sidebar-icons/settings-yellow.svg"
              : "/icons/sidebar-icons/settings-gray.svg"
          }
          alt="setting-icon"
          width={20}
          height={20}
        />
      ),
      label: (
        <Link
          href={"/settings"}
          className="font-normal text-sm font-poppins text-white"
        >
          Settings
        </Link>
      ),
    },
    {
      key: "/subscription",
      icon: (
        <RiRefreshFill
          size={20}
          color={router.pathname === "/subscription" ? "#F7B614" : "#7C7C7C"}
        />
      ),
      label: (
        <Link
          href={"/subscription"}
          className="font-normal text-sm font-poppins text-white"
        >
          Subscription
        </Link>
      ),
    },
  ];

  return (
    <Sider
      collapsible
      style={{ paddingTop: "1rem" }}
      collapsed={collapsed}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <div className="flex items-center justify-center p-2">
        <Image
          alt="alt text"
          src="/images/logo2.png"
          width={300}
          height={100}
          priority
        />
      </div>
      <Menu
        style={{
          marginTop: "2rem",
        }}
        className="sidebar transition-all duration-300"
        theme="dark"
        defaultSelectedKeys={[current]}
        onClick={({ key }) => {
          setCurrent(key);
        }}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
