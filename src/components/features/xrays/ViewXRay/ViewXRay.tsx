import React, { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../state";

// Ant Design
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import type { MenuProps } from "antd";
// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";

// Styled Components
import { MenuContainer, ViewXRayContainer } from "./ViewXRay.Styles";

// Components
import XRaySection from "./XRaySection/XRaySection";
import InfoSection from "./InfoSection/InfoSection";
import ReportSection from "./ReportSection/ReportSection";

// Assets
import XRay from "../../../../assets/images/x-ray.svg";
import HeartBeat from "../../../../assets/images/heart-beat.svg";
import MedicalReport from "../../../../assets/images/medical-report.svg";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "x-ray",
    icon: <img src={XRay} alt="x-ray" />,
    label: "X-Ray",
  },
  {
    key: "info",
    icon: <img src={HeartBeat} alt="info" />,
    label: "Info",
  },
  {
    key: "report",
    icon: <img src={MedicalReport} alt="report" />,
    label: "Report",
  },
];

function ViewXRay() {
  // States for the Sider
  const [infoCollapsed, setInfoCollapsed] = useState(false);
  const [reportCollapsed, setReportCollapsed] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
      setReportCollapsed(true);
      // UnCollapse Info
      setInfoCollapsed(false);
    } else if (e.key == "report") {
      // Collapse Info
      setInfoCollapsed(true);
      // UnCollapse Report
      setReportCollapsed(false);
    } else if (e.key == "x-ray") {
      // Collapse Info
      setInfoCollapsed(true);
      // Collapse Report
      setReportCollapsed(true);
    }
  };

  return (
    <ViewXRayContainer>
      <Layout style={{ width: "100%", height: "100%" }}>
        <Content style={{ flex: 1 }}>
          <XRaySection />
        </Content>

        {
          <Sider
            width={isSmallScreen ? "100%" : "50%"}
            collapsible
            collapsed={infoCollapsed}
            theme={websiteTheme}
            collapsedWidth={0}
            trigger={null}
          >
            <InfoSection />
          </Sider>
        }
        {
          <Sider
            width={isSmallScreen ? "100%" : "50%"}
            collapsible
            collapsed={reportCollapsed}
            theme={websiteTheme}
            collapsedWidth={0}
            trigger={null}
          >
            <ReportSection />
          </Sider>
        }
      </Layout>
      <MenuContainer
        onClick={onSideBarClick}
        defaultSelectedKeys={["info"]}
        items={items}
        mode="inline"
        inlineCollapsed={true}
      />
    </ViewXRayContainer>
  );
}

export default ViewXRay;
