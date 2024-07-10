/*eslint-disable */
import React, { useEffect, useState } from "react";

import axios from "../../../../services/apiService";
import { useParams } from "react-router-dom";

// Redux

// Ant Design
import { Layout, message, Result, Spin, Tabs } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import type { MenuProps, TabsProps } from "antd";

// Context
import { useView } from "./ViewProvider";

// Styled Components
import { StyledTabs, ViewXRayContainer } from "./ViewXRay.Styles";

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
  HeatMapOutlined,
  DropboxOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators, MainState } from "../../../../state";
import { bindActionCreators } from "redux";
import { CaseType } from "../../../../types/case";
import { set } from "date-fns";
import PrimaryButton from "../../../common/PrimaryButton/PrimaryButton";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import { ResultType } from "../../../../types/Result";
import HeatMapSection from "./HeatMapSection/HeatMapSection";
import AnnotationProvider from "./AnnotationProvider";
import Test from "./Test";
import BBSection from "./BBSection/BBSection";

// Assets
import BotBlue from "../../../../assets/images/bot-blue.svg";
import BotRed from "../../../../assets/images/bot-red.svg";
import BotGray from "../../../../assets/images/bot-grey.svg";

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

  const [caseData, setCaseData] = useState<CaseType>(null);

  // Results States
  const [llmResultData, setllmResultData] = useState<ResultType>(null);
  const [templateResultData, setTemplateResultData] =
    useState<ResultType>(null);
  const [customResultData, setCustomResultData] = useState<ResultType>(null);
  const [useAI, setUseAI] = useState(false);

  const [fetching, setFetching] = useState(true); // Initially set fetching to true
  const [error, setError] = useState(false);

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
                let customResultFound = false;

                for (let i = 0; i < resultsResponse.length; i++) {
                  const result = resultsResponse[i];

                  if (result.type === "llm") {
                    setllmResultData(result);
                    lmResultFound = true;
                  } else if (result.type === "template") {
                    setTemplateResultData(result);
                    templateResultFound = true;
                  } else if (result.type === "custom") {
                    setCustomResultData(result);
                    customResultFound = true;
                  }
                }

                if (!lmResultFound) {
                  message.info("No LM results found for this case.");
                }
                if (!templateResultFound) {
                  message.info("No template results found for this case.");
                }
                if (!customResultFound) {
                  message.info("No custom results found for this case.");
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
  // const { siderType, handleSetSiderType } = useView();
  // States for the Sider
  // const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Get Theme for the Sider from teh current theme
  // const websiteTheme = useSelector((state: MainState) => state.theme);

  // Check screen size on component mount and window resize
  useEffect(() => {
    // function handleResize() {
    //   setIsSmallScreen(window.innerWidth < 800); // Adjust breakpoint as needed
    // }
    // handleResize(); // Check initial size
    // window.addEventListener("resize", handleResize); // Add resize listener
    // return () => window.removeEventListener("resize", handleResize); // Clean up listener
  }, []);

  const toggleUseAI = () => {
    const prev_state = useAI;
    if (prev_state == false) {
      if (llmResultData) {
        setUseAI(!useAI);
      } else {
        message.info("No LM results found for this case.");
      }
    } else {
      if (customResultData) {
        setUseAI(!useAI);
      } else {
        message.info("No custom results found for this case.");
      }
    }
    // if (llmResultData) {
    //   setUseAI(!useAI);
    // } else {
    //   message.info("No LM results found for this case.");
    // }
  };

  // Render Content based on the states
  const Body = () => {
    if (fetching) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
            // width: "100%",
            flex: "1",
          }}
        >
          <Spin tip="Loading" size="large">
            <div
              style={{
                padding: 50,
                // background: "rgba(0, 0, 0, 0.05)",
                borderRadius: 4,
              }}
            />
          </Spin>
        </div>
      );
    }
    if (error || !caseData) {
      return (
        <Result
          style={{ width: "100%" }}
          status="500"
          title="500"
          subTitle={"Sorry, something went wrong."}
          extra={
            <PrimaryButton onClick={navigateToHome}>Back Home</PrimaryButton>
          }
        />
      );
    }

    return (
      <XRaySection
        llmResultData={llmResultData}
        customResultData={customResultData}
        useAI={useAI}
        originalXRayPath={caseData ? caseData.xray_path : null}
        // xRayPath={lmResultData ? lmResultData.xray_path : null}
        // xRayPath={caseData ? caseData.xray_path : null}
        // // regionPath={lmResultData ? lmResultData.region_path : null}
        // regionPath={
        //   customResultData
        //     ? customResultData.region_path
        //     : lmResultData
        //     ? lmResultData.region_path
        //     : null
        // }
        // regionSentencePath={
        //   lmResultData ? lmResultData.region_sentence_path : null
        // }
      />
    );
  };

  const xRayNavItems: TabsProps["items"] = [
    {
      key: "1",
      label: "",
      icon: <InfoCircleOutlined style={{ fontSize: "16px" }} />,
      children: (
        <InfoSection
          bot_img_blue={BotBlue}
          bot_img_grey={BotGray}
          useAI={useAI}
          toggleUseAI={toggleUseAI}
          study_case={caseData}
        />
      ),
      // <InfoSection study_case={caseData} />,
    },
    {
      key: "2",
      label: "",
      icon: <DropboxOutlined style={{ fontSize: "16px" }} />,
      children: (
        <BBSection
          bot_img_blue={BotBlue}
          bot_img_grey={BotGray}
          useAI={useAI}
          toggleUseAI={toggleUseAI}
          llmResultData={llmResultData}
          customResultData={customResultData}
          originalXRayPath={caseData ? caseData.xray_path : null}
          case_id={caseData ? caseData.id : null}
        />
      ),
    },
    {
      key: "3",
      label: "",
      icon: <HeatMapOutlined style={{ fontSize: "16px" }} />,
      children: (
        <HeatMapSection
          bot_img_blue={BotBlue}
          bot_img_grey={BotGray}
          useAI={useAI}
          toggleUseAI={toggleUseAI}
          templateResultData={templateResultData}
          customResultData={customResultData}
          case_id={caseData ? caseData.id : null}
        />
      ),
    },
    {
      key: "4",
      label: "",
      icon: <FileTextOutlined style={{ fontSize: "16px" }} />,
      children: (
        <ReportSection
          bot_img_blue={BotBlue}
          bot_img_grey={BotGray}
          useAI={useAI}
          toggleUseAI={toggleUseAI}
          llmResultData={llmResultData}
          customResultData={customResultData}
          originalXRayPath={caseData ? caseData.xray_path : null}
          case_id={caseData ? caseData.id : null}
          setLmResultData={setllmResultData}
        />
      ),
    },
  ];

  return (
    <AnnotationProvider>
      <ViewXRayContainer>
        {/* Body */}
        <Body />
        {/* Tabs */}
        <StyledTabs tabPosition="right" items={xRayNavItems} />
      </ViewXRayContainer>
    </AnnotationProvider>
  );
}

export default ViewXRay;
