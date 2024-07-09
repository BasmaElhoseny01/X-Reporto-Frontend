/*eslint-disable */
import React, { useEffect, useMemo, useState } from "react";

import axios from "../../../../services/apiService";
import { useParams } from "react-router-dom";

// Redux

// Ant Design
import { Layout, message, Result, Spin } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import type { MenuProps } from "antd";

// Context
import { useView } from "./ViewProvider";

// Styled Components
import { ViewXRayContainer } from "./ViewXRay.Styles";

// Components
import XRaySection from "./XRaySection/XRaySection";
import InfoSection from "./InfoSection/InfoSection";
import ReportSection from "./ReportSection/ReportSection";
import { Menu, Tooltip } from "antd";

// Assets
// import XRay from "../../../../assets/images/x-ray.svg";
// import HeartBeat from "../../../../assets/images/heart-beat.svg";
// import MedicalReport from "../../../../assets/images/medical-report.svg";
import {
  InfoCircleOutlined,
  FileTextOutlined,
  PictureOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators, MainState } from "../../../../state";
import { bindActionCreators } from "redux";
import { CaseType } from "../../../../types/case";
import { set } from "date-fns";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import { ResultType } from "../../../../types/study";
import HeatMapSection from "./HeatMapSection/HeatMapSection";
import AnnotationProvider from "./AnnotationProvider";
import Test from "./Test";

// Interfaces
interface RouteParams extends Record<string, string | undefined> {
  Id: string;
}

// Server Fetch
const fetchStudy = async (id: string, token: string) => {
  try {
    const response = await axios.get(`/api/v1/studies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching study: ", error);
    return null;
  }
};

const fetchStudyResults = async (id: string, token: string) => {
  try {
    const response = await axios.get(`/api/v1/studies/${id}/results`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching study results: ", error);
    return null;
  }
};

function ViewXRay() {
  // Params (Case Id)
  const { Id } = useParams<RouteParams>();

  // Navigation
  const { navigateToHome } = useCustomNavigate();

  // Redux States
  const token = useSelector((state: MainState) => state.token);

  // // Memoize Id and token to prevent unnecessary re-renders
  // const memoizedId = useMemo(() => Id, [Id]);
  // const memoizedToken = useMemo(() => token, [token]);

  const [caseData, setCaseData] = useState<CaseType>(null);
  const [lmResultData, setLmResultData] = useState<ResultType>(null);
  const [templateResultData, setTemplateResultData] =
    useState<ResultType>(null);
  const [fetching, setFetching] = useState(true); // Initially set fetching to true
  const [error, setError] = useState(false);

  // const [studyCase, setStudyCase] = useState<CaseType>(null);
  // const [xReportoResultId, setXReportoResultId] = useState<number | null>(null);

  // Dispatchers
  // const dispatch = useDispatch();
  // const { ChangeCase } = bindActionCreators(actionsCreators, dispatch);

  useEffect(() => {
    // console.log("UseEffect........")
    const fetchData = async () => {
      if (Id) {
        let fetchStartTime = Date.now(); // Record start time before fetch
        setFetching(true);
        setError(false); // Reset error state before starting the fetch

        try {
          const caseResponse = await fetchStudy(Id, token);
          if (caseResponse) {
            setCaseData(caseResponse);

            const resultsResponse = await fetchStudyResults(Id, token);
            if (resultsResponse) {
              if (resultsResponse.length === 0) {
                message.info("No results found for this case generated yet.");
              } else {
                let lmResultFound = false;
                let templateResultFound = false;

                for (let i = 0; i < resultsResponse.length; i++) {
                  const result = resultsResponse[i];

                  if (result.type === "llm") {
                    setLmResultData(result);
                    lmResultFound = true;
                  } else if (result.type === "template") {
                    setTemplateResultData(result);
                    templateResultFound = true;
                  }
                }

                if (!lmResultFound) {
                  message.error("No LM results found for this case.");
                }
                if (!templateResultFound) {
                  message.error("No template results found for this case.");
                }
              }
            } else {
              setError(true);
              message.error("Failed to fetch result data.");
            }
          } else {
            setError(true);
            message.error("Failed to fetch case data.");
          }
        } catch (error: any) {
          setError(true);
          message.error("Error fetching data: " + error.message);
        } finally {
          // Calculate time elapsed since fetch started
          let elapsedTime = Date.now() - fetchStartTime;
          let delayTime = Math.max(0, 1000 - elapsedTime); // Ensure at least 1 second delay

          if (delayTime === 0) {
            // If fetch took longer than 1 second, set fetching to false immediately
            setFetching(false);
          } else {
            // Otherwise, delay setting fetching to false by delayTime
            setTimeout(() => {
              setFetching(false);
            }, delayTime);
          }
        }
      } else {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  // }, [Id, token]);
  // Context
  const { siderType, handleSetSiderType } = useView();
  // States for the Sider
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Get Theme for the Sider from teh current theme
  const websiteTheme = useSelector((state: MainState) => state.theme);

  // Check screen size on component mount and window resize
  useEffect(() => {
    // function handleResize() {
    //   setIsSmallScreen(window.innerWidth < 800); // Adjust breakpoint as needed
    // }
    // handleResize(); // Check initial size
    // window.addEventListener("resize", handleResize); // Add resize listener
    // return () => window.removeEventListener("resize", handleResize); // Clean up listener
  }, []);

  const onSideBarClick: MenuProps["onClick"] = (e) => {
    if (e.key == "info") {
      // Collapse Report
      handleSetSiderType("info");
      // setType("info");
    } else if (e.key == "x-ray") {
      handleSetSiderType("x-ray");
      // setType("x-ray");
    } else if (e.key == "report") {
      handleSetSiderType("report");
      // setType("report");
    } else if (e.key == "heat") {
      handleSetSiderType("heat");
    }
  };

  // Render Content based on the states
  const Body = () => {
    // if (fetching) {
    //   return (
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         height: "80%",
    //         width: "100%",
    //       }}
    //     >
    //       <Spin tip="Loading" size="large">
    //         <div
    //           style={{
    //             padding: 50,
    //             // background: "rgba(0, 0, 0, 0.05)",
    //             borderRadius: 4,
    //           }}
    //         />
    //       </Spin>
    //     </div>
    //   );
    // }
    // if (error || !caseData) {
    //   return (
    //     <Result
    //       style={{ width: "100%" }}
    //       status="500"
    //       title="500"
    //       subTitle={"Sorry, something went wrong."}
    //       extra={
    //         <PrimaryButton onClick={navigateToHome}>Back Home</PrimaryButton>
    //       }
    //     />
    //   );
    // }

    // const RightSection = () => {
    //   // Show the Info Section only if the type is info
    //   if (siderType === "info") {
    //     return null;
    //     //  <InfoSection study_case={caseData} />;
    //   }
    //   // Show the Report Section only if the type is report
    //   else if (siderType === "report") {
    //     return null;
    //     // <ReportSection
    //     //   lmResultData={lmResultData}
    //     //   setLmResultData={setLmResultData}
    //     // />
    //   }
    //   // Show HeatMap Section only if the type is heatmap
    //   else if (siderType === "heat") {
    //     return null;
    //     // <HeatMapSection
    //     //   templateResultData={templateResultData}
    //     //   setTemplateResultData={setTemplateResultData}
    //     // />
    //     // return <ReportSection />;
    //   }
    //   return null;
    // };

    return (
      <>
        <AnnotationProvider>
          <Test />
          {/* <XRaySection
            xRayPath={lmResultData ? lmResultData.xray_path : null}
            regionPath={lmResultData ? lmResultData.region_path : null}
          /> */}
          {/* <RightSection /> */}
        </AnnotationProvider>
      </>
    );
  };

  return (
    <AnnotationProvider>
      <ViewXRayContainer>
        <Layout style={{ width: "100%", height: "100%" }}>
          <Content style={{ display: "flex", width: "100%" }}>
            {/* <Body /> */}
            <Test />
            <XRaySection
              xRayPath={lmResultData ? lmResultData.xray_path : null}
              regionPath={lmResultData ? lmResultData.region_path : null}
            />
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
            <Menu
              onClick={onSideBarClick}
              selectedKeys={[siderType]}
              mode="inline"
              theme={websiteTheme}
            >
              <Menu.Item
                key="info"
                icon={
                  <Tooltip title="Info" placement="left">
                    <InfoCircleOutlined />
                  </Tooltip>
                }
              ></Menu.Item>
              <Menu.Item
                key="x-ray"
                icon={
                  <Tooltip title="X-Ray" placement="left">
                    <PictureOutlined />
                  </Tooltip>
                }
              >
                {/* Optionally, you can also wrap this label with Tooltip if needed */}
              </Menu.Item>
              <Menu.Item
                key="report"
                icon={
                  <Tooltip title="Report" placement="left">
                    <FileTextOutlined />
                  </Tooltip>
                }
              ></Menu.Item>
              <Menu.Item
                key="heat"
                icon={
                  <Tooltip title="Checklist Report" placement="left">
                    <BarsOutlined />
                  </Tooltip>
                }
              ></Menu.Item>
            </Menu>
          </Sider>
        </Layout>
      </ViewXRayContainer>
    </AnnotationProvider>
  );
}

export default ViewXRay;