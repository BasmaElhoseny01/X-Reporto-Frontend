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
  ExperimentOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionsCreators, MainState } from "../../../state";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "", icon: <HomeOutlined />, label: "Home" },
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
      { key: "patients", label: "All" },
      { key: "patients/archived", label: "Archived" },
      { key: "patient", label: "View Patient" },
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
      { key: "report", label: "View X-Ray" },
      { key: "report/new", label: "New X-Ray" },
    ],
  },
  { key: "Profile", icon: <ProfileOutlined />, label: "Profile" },
  { key: "Results", icon: <CheckCircleOutlined />, label: "Results" },
  { key: "Exception", icon: <WarningOutlined />, label: "Exception" },
  { key: "Account", icon: <UserOutlined />, label: "Account" },
  {
    key: "GraphicEditor",
    icon: <HighlightOutlined />,
    label: "Graphic Editor",
  },
  { key: "Doctors", icon: <ExperimentOutlined />, label: "Doctors" },
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
