/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../state";

// Ant Design
import { Flex, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import type { MenuProps } from "antd";
// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";

// Styled Components
import { ViewXRayContainer } from "./ViewXRay.Styles";

// Components
import XRaySection from "./XRaySection/XRaySection";
import InfoSection from "./InfoSection/InfoSection";
import ReportSection from "./ReportSection/ReportSection";
import { Menu, Tooltip } from 'antd';

// Assets
// import XRay from "../../../../assets/images/x-ray.svg";
// import HeartBeat from "../../../../assets/images/heart-beat.svg";
// import MedicalReport from "../../../../assets/images/medical-report.svg";
import {
  FileTextOutlined,
  PictureOutlined,
  BarsOutlined
} from "@ant-design/icons";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "x-ray",
    icon: <PictureOutlined alt="x-ray" />,
    // label: "X-Ray",
  },
  {
    key: "info",
    icon: <BarsOutlined />,
    // label: "Info",
  },
  {
    key: "report",
    icon: <FileTextOutlined alt="report" />,
    // label: "Report",
  },
];

function ViewXRay() {
  // States for the Sider
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [type, setType] = useState("info");
  // Get Theme for the Sider from teh current theme
  const websiteTheme = useSelector((state: MainState) => state.theme);

  // Check screen size on component mount and window resize
  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 800); // Adjust breakpoint as needed
    }

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => window.removeEventListener("resize", handleResize); // Clean up listener
  }, []);

  const onSideBarClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    if (e.key == "info") {
      // Collapse Report
      setType("info");
    } else if (e.key == "report") {
      setType("report");
    } else if (e.key == "x-ray") {
      setType("x-ray");
    }
  };

  return (
    <ViewXRayContainer>
      <Layout style={{ width: "100%", height: "100%" }}>
        <Content style={{display:'flex'}}>
            <XRaySection />
            {
              // Show the Info Section only if the type is info
              type === "info" ? <InfoSection />:
              // Show the Report Section only if the type is report
              type === "report" ? <ReportSection />:
              // Show the XRay Section by default
              <XRaySection />
            }
        </Content>
          <Sider
            width={isSmallScreen ? "10%" : "5%"}
            collapsible
            collapsed={false}
            theme={websiteTheme}
            collapsedWidth={0}
            trigger={null}
            // style={{ height: "max-Content" }}
          >
            <Menu onClick={onSideBarClick} selectedKeys={[type]} mode="inline" theme={websiteTheme}>
              <Menu.Item key="x-ray" icon={
                <Tooltip title="X-Ray" placement="left">
                  <PictureOutlined />
                </Tooltip>
              }>
                {/* Optionally, you can also wrap this label with Tooltip if needed */}
                X-Ray
              </Menu.Item>
              <Menu.Item key="info" icon={
                <Tooltip title="Info" placement="left">
                  <BarsOutlined />
                </Tooltip>
              }>
                Info
              </Menu.Item>
              <Menu.Item key="report" icon={
                <Tooltip title="Report" placement="left">
                  <FileTextOutlined />
                </Tooltip>
              }>
                Report
              </Menu.Item>
            </Menu>
          </Sider>
          
      </Layout>
    </ViewXRayContainer>
  );
}

export default ViewXRay;
