import React, { useState } from "react";
import {
  DashboardOutlined,
  HomeOutlined,
  UsergroupDeleteOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  UserOutlined,
  HighlightOutlined,
  FileTextOutlined,
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
    key: "sub1",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    children: [
      { key: "Analysis", label: "Analysis" },
      { key: "Workplace", label: "Workplace" },
      { key: "Monitor", label: "Monitor" },
    ],
  },
  {
    key: "sub2",
    label: "Patients",
    icon: <UsergroupDeleteOutlined />,
    children: [
      { key: "Patients/All", label: "All" },
      { key: "Patients/Archived", label: "Archived" },
      { key: "Patients/NewPatient", label: "New Patient" },
      { key: "Patients/ViewPatient", label: "View Patient" },
    ],
  },
  {
    key: "sub3",
    label: "Reports",
    icon: <FileTextOutlined />,
    children: [
      { key: "Reports/WorkList", label: "Work list" },
      { key: "Reports/Completed", label: "Completed" },
      { key: "Reports/NewX-Ray", label: "New X-Ray" },
      { key: "Reports/ViewX-Ray", label: "View X-Ray" },
    ],
  },
  { key: "Profile", icon: <ProfileOutlined />, label: "Profile" },
  { key: "Results", icon: <CheckCircleOutlined />, label: "Results" },
  { key: "Exception", icon: <WarningOutlined />, label: "Exception" },
  { key: "Account", icon: <UserOutlined />, label: "Account" },
  { key: "GraphicEditor", icon: <HighlightOutlined />, label: "Graphic Editor" },
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
