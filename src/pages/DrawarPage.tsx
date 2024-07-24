import React, { useState } from "react";
import { Button, Drawer, Tooltip, Dropdown, Menu, Space, Slider } from "antd";
import {
  UndoOutlined,
  RedoOutlined,
  EditOutlined,
  DeleteOutlined,
  HighlightOutlined,
  LinkOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

function DrawarPage() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const drawMenu = (
    <Menu>
      <Menu.Item key="1">Pencil</Menu.Item>
      <Menu.Item key="2">Marker</Menu.Item>
      <Menu.Item key="3">Brush</Menu.Item>
      <SubMenu title="Color">
        <Menu.Item key="4">Black</Menu.Item>
        <Menu.Item key="5">White</Menu.Item>
        <Menu.Item key="6">Blue</Menu.Item>
        <Menu.Item key="7">Yellow</Menu.Item>
        <Menu.Item key="8">Green</Menu.Item>
      </SubMenu>
    </Menu>
  );

  return (
    <>
      <Space>
        <Tooltip title="Undo">
          <Button icon={<UndoOutlined />} />
        </Tooltip>
        <Tooltip title="Redo">
          <Button icon={<RedoOutlined />} />
        </Tooltip>
        <Tooltip title="brightness">
          <Dropdown overlay={<Slider />}>
            <Button icon={<EditOutlined />} />
          </Dropdown>
        </Tooltip>
        <Tooltip title="Draw">
          <Dropdown overlay={drawMenu}>
            <Button icon={<EditOutlined />} />
          </Dropdown>
        </Tooltip>
        <Tooltip title="Erase">
          <Button icon={<DeleteOutlined />} />
        </Tooltip>
        <Tooltip title="Highlight">
          <Button icon={<HighlightOutlined />} />
        </Tooltip>
        <Tooltip title="Link">
          <Button icon={<LinkOutlined />} />
        </Tooltip>
        <Tooltip title="Color">
          <Button icon={<BgColorsOutlined />} />
        </Tooltip>
      </Space>
      <Button type="primary" onClick={showDrawer}>
        Open Report
      </Button>

      <Drawer
        title="Report"
        placement="right"
        closable={true}
        onClose={closeDrawer}
        visible={visible}
        mask={false} // Disable mask
        maskClosable={true} // Disable closing on mask click
        width={"50%"} // Customize the width of the drawer
        style={{ position: "absolute" }} // Adjust position if needed
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}

export default DrawarPage;
