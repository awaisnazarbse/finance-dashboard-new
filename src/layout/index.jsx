import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { useState } from "react";
import DashboardHeader from "./Header";

const { Content } = Layout;

const DashboardLayout = ({ children, title, tabs, active, setActive }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        role={"admin"}
      />
      <Layout style={{ backgroundColor: "#F1F5F9", height: "100vh" }}>
        <DashboardHeader
          setCollapsed={setCollapsed}
          collapsed={collapsed}
          title={title}
          tabs={tabs}
          active={active}
          setActive={setActive}
        />
        <Content>
          <div
            style={{
              minHeight: 360,
              backgroundColor: "#E8ECF1",
              height: "100%",
              overflowY: "scroll",
            }}
            className="main-content"
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
