/*eslint-disable */
import React, { useEffect, useState } from "react";

import axios from "../../../../services/apiService";
import { useParams } from "react-router-dom";

// Redux

// Ant Design
import { Button, Layout, message, Result, Spin, Tabs } from "antd";
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

  const [xRayPath, setXRayPath] = useState<string>(""); // path of the image being displayed now (Path in the BE :D)
  const [useDeNoisedImage, setUseDeNoisedImage] = useState<boolean>(false); // path of the image being displayed now (Path in the BE :D)
  const [useAI, setUseAI] = useState(false);

  const [fetching, setFetching] = useState(true); // Initially set fetching to true
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("ViewXRay........");
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

  // Context
  // const { siderType, handleSetSiderType } = useView();
  // States for the Sider
  // const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Get Theme for the Sider from teh current theme
  // const websiteTheme = useSelector((state: MainState) => state.theme);

  // Check screen size on component mount and window resize
  // useEffect(() => {
  // function handleResize() {
  //   setIsSmallScreen(window.innerWidth < 800); // Adjust breakpoint as needed
  // }
  // handleResize(); // Check initial size
  // window.addEventListener("resize", handleResize); // Add resize listener
  // return () => window.removeEventListener("resize", handleResize); // Clean up listener
  // }, []);

  const toggleUseAI = () => {
    console.log("toggleUseAI", useAI, llmResultData, customResultData);
    // const prev_state = useAI;
    const next_state = !useAI;
    if (next_state == true) {
      if (llmResultData) {
        setUseAI(next_state); // true
        setUseDeNoisedImage(true); //restore the de-noised image flag
      } else {
        message.info("No LM results found for this case.");
      }
    } else {
      if (customResultData) {
        setUseAI(next_state);
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

  const handleUseDeNoisedImage = () => {
    const next_state = !useDeNoisedImage;
    // check if de-noised image is available
    if (next_state && (!llmResultData || llmResultData?.xray_path === null)) {
      // He wanted to use the de-noised(next_state=true ) and it is not available
      message.info(
        "No de-noised Image found for this case. [Run X-Ray AI first to get de-noised image.]"
      );
      return;
    } else {
      // Case(1) next_state is true and de-noised image is available
      // Case(2) next_state is false and de-noised image is available
      // Case(3) next_state is false and de-noised image is not available
      // if (next_state) {
      //   message.info("Switching to De-Noised Image");
      // } else {
      //   message.info("Switching to Original Image");
      // }
      // Toggle the state to the next state :D
      setUseDeNoisedImage(next_state);

      // Reset useAI to false
      setUseAI(false);
    }
  };

  // Render Content based on the states
  let content;
  if (fetching) {
    content = (
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
  } else if (error || !caseData) {
    content = (
      <Result
        style={{ flex: "1" }}
        status="500"
        title="500"
        subTitle={"Sorry, something went wrong."}
        extra={
          <PrimaryButton onClick={navigateToHome}>Back Home</PrimaryButton>
        }
      />
    );
  } else {
    content = (
      // <h1>XraySection</h1>
      // <Test />
      <XRaySection
        llmResultData={llmResultData}
        customResultData={customResultData}
        useAI={useAI}
        // originalXRayPath={caseData ? caseData.xray_path : null}
        caseId={caseData ? caseData.id : null}
        setXRayPath={setXRayPath}
        useDeNoisedImage={useDeNoisedImage}
        handleUseDeNoisedImage={handleUseDeNoisedImage}
      />
    );
  }

  const xRayNavItems: TabsProps["items"] = [
    {
      key: "1",
      label: "",
      icon: <InfoCircleOutlined style={{ fontSize: "16px" }} />,
      children: (
        <InfoSection
          botImgBlue={BotBlue}
          botImgGrey={BotGray}
          useAI={useAI}
          toggleUseAI={toggleUseAI}
          studyCase={caseData}
        />
      ),
    },
    {
      key: "2",
      label: "",
      icon: <DropboxOutlined style={{ fontSize: "16px" }} />,
      children: (
        // <h1>BBSection</h1>
        <BBSection
          bot_img_blue={BotBlue}
          bot_img_grey={BotGray}
          useAI={useAI}
          setUseAI={setUseAI}
          toggleUseAI={toggleUseAI}
          llmResultData={llmResultData}
          customResultData={customResultData}
          setLmResultData={setllmResultData}
          setCustomResultData={setCustomResultData}
          // xRayPath={caseData ? caseData.xray_path : null}
          xRayPath={xRayPath}
          case_id={caseData ? caseData.id : null}
        />
      ),
    },
    {
      key: "3",
      label: "",
      icon: <HeatMapOutlined style={{ fontSize: "16px" }} />,
      children: (
        // <HeatMapSection
        //   bot_img_blue={BotBlue}
        //   bot_img_grey={BotGray}
        //   useAI={useAI}
        //   toggleUseAI={toggleUseAI}
        //   templateResultData={templateResultData}
        //   customResultData={customResultData}
        //   case_id={caseData ? caseData.id : null}
        // />
        <h1>Heat Map</h1>
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
          xRayPath={xRayPath}
          case_id={caseData ? caseData.id : null}
          setLmResultData={setllmResultData}
        />
      ),
    },
  ];

  return (
    <AnnotationProvider>
      <ViewXRayContainer>
        {/* <Button onClick={() => setUseAI(!useAI)}>Use AI</Button> */}
        {/* Content */}
        {content}
        {/* Tabs */}
        <StyledTabs tabPosition="right" items={xRayNavItems} />
      </ViewXRayContainer>
    </AnnotationProvider>
  );
}

export default ViewXRay;
