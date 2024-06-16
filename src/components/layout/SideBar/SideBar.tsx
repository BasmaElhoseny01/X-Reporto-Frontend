import React, { useState } from 'react';
import {
  DashboardOutlined,
  HomeOutlined,
  UsergroupDeleteOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  UserOutlined,
  HighlightOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionsCreators, MainState } from '../../../state';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <HomeOutlined />, label: 'Home' },
  {
    key: 'sub1',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    children: [
      { key: '2', label: 'Analysis' },
      { key: '3', label: 'Workplace' },
      { key: '4', label: 'Monitor' },
    ],
  },
  {
    key: 'sub2',
    label: 'Patients',
    icon: <UsergroupDeleteOutlined />,
    children: [
      { key: '5', label: 'All' },
      { key: '6', label: 'Archived' },
      { key: '7', label: 'New Patient' },
      { key: '8', label: 'View Patient' },
    ],
  },
  {
    key: 'sub3',
    label: 'Reports',
    icon: <FileTextOutlined />,
    children: [
      { key: '9', label: 'Worklist' },
      { key: '10', label: 'Completed' },
      { key: '11', label: 'New X-Ray' },
      { key: '12', label: 'View X-Ray' },
    ],
  },
  { key: '13', icon: <ProfileOutlined />, label: 'Profile' },
  { key: '14', icon: <CheckCircleOutlined />, label: 'Results' },
  { key: '15', icon: <WarningOutlined />, label: 'Exception' },
  { key: '16', icon: <UserOutlined />, label: 'Account' },
  { key: '17', icon: <HighlightOutlined />, label: 'Graphic Editor' },

];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const drawer = useSelector((state: MainState) => state.drawer);
  const dispatch = useDispatch();
  const { ChangeDrawer } = bindActionCreators(actionsCreators, dispatch);  
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  const onMenuClick: MenuProps['onClick'] = (e) => {
    ChangeDrawer(Number(e.key));
  };

  return (
    <Sider
    collapsible collapsed={collapsed} onCollapse={onCollapse}
    onMouseEnter={()=>setCollapsed(false)}
    onMouseLeave={()=>setCollapsed(true)}
    trigger={null}
    style={{overflow: 'auto', height: '100vh', left: 0}}
    >
      <Menu
        defaultSelectedKeys={[drawer.toString()]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={onMenuClick}
      />
    </Sider>
  );
};

export default SideBar;