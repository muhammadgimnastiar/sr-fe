import { useState, useEffect } from "react";
import {
  ProjectOutlined,
  CopyrightOutlined,
  BookOutlined,
  UsergroupDeleteOutlined,
  GroupOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Avatar, Dropdown } from "antd";
import FooterComponent from "../../../components/FooterComponent";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import DashboardContent from "../components/DashboardContent.jsx";
import ManageEventsContent from "../components/ManageEvent.jsx";
import ManageReportsContent from "../components/ManageReport.jsx";
import ManageExchangeContent from "../components/ManageExchange.jsx";
import ManageUsersContent from "../components/ManageUser.jsx";
import ManageItemContent from "../components/ManageItem.jsx";
import ManageBlogContent from "../components/ManageBlog.jsx";
const { Header, Sider, Content } = Layout;

export default function DashboardAdminPage() {
  const itemSidebar = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <UsergroupDeleteOutlined />,
      label: "Manage Users",
    },
    {
      key: "3",
      icon: <BookOutlined />,
      label: "Manage Events",
    },
    {
      key: "7",
      icon: <GroupOutlined />,
      label: "Manage Blogs",
    },
    {
      key: "4",
      icon: <ProjectOutlined />,
      label: "Manage Reports",
    },
    {
      key: "5",
      icon: <CopyrightOutlined />,
      label: "Manage Exchange",
    },
    {
      key: "6",
      icon: <CopyrightOutlined />,
      label: "Manage Items",
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const cookies = new Cookies();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("selectedTab") || "1"
  );

  const handleMenuClick = (selected) => {
    setSelectedTab(selected.key);
    localStorage.setItem("selectedTab", selected.key); // Update local storage
  };

  useEffect(() => {
    // Update local storage on selectedTab change (optional)
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  const setState = useState({
    ACCESS_TOKEN: cookies.get("access_token"),
    REFRESH_TOKEN: cookies.get("refresh_token"),
    USER_ROLE: cookies.get("user_role"),
  });

  const logOut = () => {
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    cookies.remove("user_role");

    setState((prevState) => ({
      ...prevState,
      ACCESS_TOKEN: null,
      REFRESH_TOKEN: null,
      USER_ROLE: null,
    }));
  };

  const itemsAdmin = [
    {
      key: "1",
      label: <Link to={"/admin/profile"}>Profile</Link>,
    },
    {
      key: "2",
      label: (
        <Link to={"/"} onClick={logOut}>
          <p>Logout</p>
        </Link>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          collapsed={collapsed}
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            setCollapsed(collapsed);
            console.log(collapsed, type);
          }}
          theme="light"
        >
          <div className="demo-logo-vertical text-center my-10 text-xl font-bold text-textColor">
            SR Admin
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={itemSidebar}
            onClick={handleMenuClick}
            selectedKeys={[selectedTab]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Link to={"/admin/dashboard"}>
              <img
                src="/logo.png"
                className="flex items-start h-8 mr-3"
                alt="Smart Recycling Logo"
              />
            </Link>
            <Dropdown
              menu={{ items: itemsAdmin }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: "20px",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              {selectedTab === "1" && <DashboardContent />}
              {selectedTab === "2" && <ManageUsersContent />}
              {selectedTab === "3" && <ManageEventsContent />}
              {selectedTab === "4" && <ManageReportsContent />}
              {selectedTab === "5" && <ManageExchangeContent />}
              {selectedTab === "6" && <ManageItemContent />}
              {selectedTab === "7" && <ManageBlogContent />}
            </div>
          </Content>
        </Layout>
      </Layout>
      <FooterComponent />
    </>
  );
}
