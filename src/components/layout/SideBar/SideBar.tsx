import React, { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionsCreators, MainState } from "../../../state";

// Ant Design
import {
  HomeOutlined,
  UsergroupDeleteOutlined,
  UserOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  DesktopOutlined,
  HighlightOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";

// Paths
// import paths from "../../../pages/paths";

const SideBar = () => {
  const user = useSelector((state: MainState) => state.user);

  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    { key: "/", icon: <HomeOutlined />, label: "Home" },
    { key: "/account", icon: <UserOutlined />, label: "Account" },
    {
      key: "sub2",
      label: "patients",
      icon: <UsergroupDeleteOutlined />,
      children: [
        { key: "/patients", label: "All" },
        // { key: "/patients/archived", label: "Archived" },
        ...(user?.type === "employee"
          ? [{ key: "/patients/new", label: "New Patient" }]
          : []),
      ],
    },
    {
      key: "sub3",
      label: "Cases",
      icon: <FileTextOutlined />,
      children: [
        { key: "/cases/unassigned", label: "Unassigned" },
        { key: "/cases/pending", label: "Pending" },
        { key: "/cases/completed", label: "Completed" },
        { key: "/cases/archived", label: "Archived" },
        ...(user?.type === "employee"
          ? [{ key: "/cases/new", label: "Add Case" }]
          : []),
      ],
    },
    {
      key: "sub5",
      label: "Templates",
      icon: <HighlightOutlined />,
      children: [
        { key: "/templates", label: "All" },
        ...(user?.type === "doctor"
          ? [{ key: "/templates/new", label: "New" }]
          : []),
      ],
    },
    ...(user?.type === "employee"
      ? [
          {
            key: "sub4",
            label: "Doctors",
            icon: <ExperimentOutlined />,
            children: [
              { key: "/doctors", label: "All" },
              // { key: "/doctors/archived", label: "Archived" },
              { key: "/doctors/new", label: "New" },
            ],
          },
        ]
      : []),

    ...(user?.type === "employee"
      ? [
          {
            key: "sub6",
            label: "Employees",
            icon: <DesktopOutlined />,
            children: [
              { key: "/employees", label: "All" },
              // { key: "/doctors/archived", label: "Archived" },
              { key: "/employees/new", label: "New" },
            ],
          },
        ]
      : []),

    { key: "/LogOut", icon: <LogoutOutlined />, label: "Logout" },
  ];

  const [collapsed, setCollapsed] = useState(true);
  const drawer = useSelector((state: MainState) => state.drawer);
  const websiteTheme = useSelector((state: MainState) => state.theme);

  const dispatch = useDispatch();
  const { ChangeDrawer, ChangeToken, ChangeUserName, ChangeUser, ChangeId } =
    bindActionCreators(actionsCreators, dispatch);
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  const onMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "/LogOut") {
      ChangeToken("");

      // Set User to Null
      ChangeUser(null);
      ChangeUserName("");
      ChangeId(0);
    } else {
      ChangeDrawer(e.key);
      window.location.pathname = `${e.key}`;
    }
  };

  useEffect(() => {
    ChangeDrawer(window.location.pathname.toLocaleLowerCase());
  }, [drawer]);

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
        overflow: "hidden",
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
        style={{ marginTop: "0px", height: "100%" }}
      />
    </Sider>
  );
};

export default SideBar;
