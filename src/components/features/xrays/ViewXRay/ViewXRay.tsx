import React, { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { MainState } from "../../../../state";

// Ant Design
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import type { MenuProps } from "antd";

// Context
import { useView } from "./ViewProvider";

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
  const {
    infoCollapsed,
    handleSetInfoCollapsed,
    reportCollapsed,
    handleSetReportCollapsed,
  } = useView();

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
    if (e.key == "info") {
      // Collapse Report
      handleSetReportCollapsed(true);
      // UnCollapse Info
      handleSetInfoCollapsed(false);
    } else if (e.key == "report") {
      // Collapse Info
      handleSetInfoCollapsed(true);
      // UnCollapse Report
      handleSetReportCollapsed(false);
      // setReportCollapsed(false);
    } else if (e.key == "x-ray") {
      // Collapse Info
      handleSetInfoCollapsed(true);
      // setInfoCollapsed(true);
      // Collapse Report
      handleSetReportCollapsed(true);
      // setReportCollapsed(true);
    }
  };

  return (
    <ViewXRayContainer>
      <Layout style={{ width: "100%", height: "100%" }}>
        <Content style={{ flex: 1 }} id="xray-content">
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
