import React, { useState } from "react";
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
  { key: "Home", icon: <HomeOutlined />, label: "Home" },
  {
    key: "sub2",
    label: "Patients",
    icon: <UsergroupDeleteOutlined />,
    children: [
      { key: "patients", label: "All" },
      { key: "patients/archived", label: "Archived" },
      { key: "patient/new", label: "New Patient" },
    ],
  },
  {
    key: "sub3",
    label: "Reports",
    icon: <FileTextOutlined />,
    children: [
      { key: "reports/WorkList", label: "Work list" },
      { key: "reports/Completed", label: "Completed" },
      { key: "reports/archived", label: "Archived" },
      { key: "report/new", label: "New X-Ray" },
    ],
  },
  { key: "Doctors", icon: <ExperimentOutlined />, label: "Doctors" },
  { key: "Account", icon: <UserOutlined />, label: "Account" },
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
    window.location.pathname = `/${e.key}`;
  };

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
        defaultSelectedKeys={[drawer]}
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
