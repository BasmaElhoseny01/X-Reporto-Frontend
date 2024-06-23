import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  UsergroupDeleteOutlined,
  UserOutlined,
  FileTextOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionsCreators, MainState } from "../../../state";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "/", icon: <HomeOutlined />, label: "Home" },
  {
    key: "sub2",
    label: "patients",
    icon: <UsergroupDeleteOutlined />,
    children: [
      { key: "/patients", label: "All" },
      { key: "/patients/archived", label: "Archived" },
      { key: "/patients/new", label: "New Patient" },
    ],
  },
  {
    key: "sub3",
    label: "Reports",
    icon: <FileTextOutlined />,
    children: [
      { key: "/reports/workList", label: "Work list" },
      { key: "/reports/completed", label: "Completed" },
      { key: "/reports/archived", label: "Archived" },
      { key: "/report/new", label: "New X-Ray" },
    ],
  },
  {
    key: "sub4",
    label: "Doctors",
    icon: <ExperimentOutlined />,
    children: [
      { key: "/doctors", label: "All" },
      { key: "/doctors/archived", label: "Archived" },
    ],
  },
  { key: "/account", icon: <UserOutlined />, label: "Account" },
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const drawer = useSelector((state: MainState) => state.drawer);
  const websiteTheme = useSelector((state: MainState) => state.theme);

  const dispatch = useDispatch();
  const { ChangeDrawer } = bindActionCreators(actionsCreators, dispatch);
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  const onMenuClick: MenuProps["onClick"] = (e) => {
    ChangeDrawer(e.key);
    window.location.pathname = `${e.key}`;
  };

  useEffect(() => {
    ChangeDrawer(window.location.pathname.toLocaleLowerCase());
    console.log(drawer);
  },[window.location.pathname,drawer]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      trigger={null}
      theme={websiteTheme}
      style={{
        overflow: "auto",
        height: "auto",
        scrollbarWidth: "none",
        left: 0,
      }}
    >
      <Menu
        // defaultSelectedKeys={[drawer]}
        selectedKeys={[drawer]}
        mode="inline"
        theme={websiteTheme}
        inlineCollapsed={collapsed}
        items={items}
        onClick={onMenuClick}
        style={{ marginTop: "10px", height: "100%" }}
      />
    </Sider>
  );
};

export default SideBar;
