/* eslint-disable*/
import React, { useEffect, useState } from "react";

// Context
import ToolProvider from "./ToolProvider";
import { useAnnotations } from "../AnnotationProvider";
import StagePropertiesProvider from "./StagePropertiesProvider";
import { useView } from "../ViewProvider";

// Antd Components

// Components
import ToolBar from "./ToolBar/ToolBar";
import CanvasSection from "./CanvasSection/CanvasSection";
// import BBFindings from "../BBSection/BBSection";

// Styled Components
import {
  XRaySectionContainer,
  // BBFindingsContainer,
  // XRayContainer,
} from "./XRaySection.Styles";
import axios from "../../../../../services/apiService";
import { MainState } from "../../../../../state";
import { useSelector } from "react-redux";
import useCustomNavigate from "../../../../../hooks/useCustomNavigate";
import { message, Result, Skeleton, Spin } from "antd";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";
import { set } from "date-fns";

import { anatomicalRegionsIndexToKey } from "../../../../../constants/anatomicalRegions";

import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import { Box, Region } from "../XRay.types";
import Test from "../Test";
import { ResultType } from "../../../../../types/Result";
// Interfaces
interface XRaySectionProps {
  caseId: number | null;
  setXRayPath: (path: string) => void;
  handleUseDeNoisedImage: () => void;
  useDeNoisedImage: boolean;

  llmResultData: ResultType | null;
  customResultData: ResultType | null;

  useAI: boolean;
  // Props Here
  // xRayPath: string | null;
  // regionPath: string | null;
  // regionSentencePath: string | null;
}

// Server Fetch
const downloadResizedOriginalXRayFile = async (id: number, token: string) => {
  try {
    const response = await axios.get(
      `api/v1/studies/${id}/download_resized_image`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Change responseType to "blob"
      }
    );
    // console.log("downloadResizedOriginalXRayFile", response);

    // Create a URL for the image blob and set it to an <img> element
    const imageURL = URL.createObjectURL(response.data);
    // console.log("imageURL", imageURL);

    const resizedXRayPath = response.headers.resized_xray_path;
    // console.log("xRayPath", resizedXRayPath);

    return { imageURL, resizedXRayPath };
  } catch (error) {
    console.error("Error fetching Resized X-Ray: ", error);
    return null;
  }
};

// Server Fetch
const downloadXRayFile = async (file_path: string, token: string) => {
  try {
    const response = await axios.get(`api/v1/results/download_file`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        file_path: file_path,
      },
      responseType: "blob", // Change responseType to "blob"
    });

    // const blob = await response.blob();
    // const url = URL.createObjectURL(blob);

    // Create a URL for the image blob and set it to an <img> element
    const imageURL = URL.createObjectURL(response.data);
    console.log(imageURL);

    return imageURL;
  } catch (error) {
    console.error("Error fetching X-Ray: ", error);
    return null;
  }
};

const downloadBBoxesFile = async (file_path: string, token: string) => {
  try {
    const response = await axios.get(`api/v1/results/download_file`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        file_path: file_path,
      },
      responseType: "text",
    });

    // Split the text into lines and trim any extra whitespace
    const lines = response?.data?.trim().split("\n");
    // console.log("lines", lines);

    const regions: Region[] = [];

    // Process each line to extract region ID and bounding box coordinates
    lines.forEach((line: string) => {
      const parts = line.trim().split(" ");

      // Parse region ID and coordinates
      const regionId = parseInt(parts[0]);
      const x = parseFloat(parts[1]);
      const y = parseFloat(parts[2]);
      const width = parseFloat(parts[3]);
      const height = parseFloat(parts[4]);

      // Create object and push to boundingBoxes array
      const boundingBox: Box = {
        x,
        y,
        width,
        height,
      };

      regions.push({
        id: regionId.toString(),
        // title: anatomicalRegionsIndexToKey[regionId],
        title_id: regionId,
        finding: "",
        // ai: false,
        box: boundingBox,
      });
    });

    return regions;
  } catch (error) {
    console.error("Error fetching Bounding Boxes: ", error);
    return null;
  }
};

const downloadBBoxesFindingsFile = async (file_path: string, token: string) => {
  try {
    const response = await axios.get(`api/v1/results/download_file`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        file_path: file_path,
      },
      responseType: "text",
    });

    // Split the text into lines and trim any extra whitespace
    const lines = response?.data?.trim().split("\n");
    // console.log("lines", lines);

    const findings: string[] = lines;
    return findings;
  } catch (error) {
    console.error("Error fetching Bounding Boxes Findings: ", error);
    return null;
  }
};

function XRaySection(props: XRaySectionProps) {
  const {
    caseId,
    setXRayPath,
    handleUseDeNoisedImage,
    useDeNoisedImage,
    llmResultData,
    customResultData,
    useAI,
  } = props;

  // Navigation
  const { navigateToHome } = useCustomNavigate();

  // Redux States
  const token = useSelector((state: MainState) => state.token);

  // const { infoCollapsed, reportCollapsed } = useView();
  const { siderType } = useView();

  const [xRayURL, setXRayURL] = useState<string | null>(null);
  const { handleSetAnnotations } = useAnnotations();
  // const [bbData, setBBData] = useState(null);

  const [fetching, setFetching] = useState(true); // Initially set fetching to true
  const [error, setError] = useState(false);

  useEffect(() => {
    // console.log("XRaySection .........", props);
    console.log("XRaySection .........");

    const fetchOriginalXRay = async () => {
      try {
        if (!caseId) {
          throw new Error("No case ID found");
        }

        const xRayResponse = await downloadResizedOriginalXRayFile(
          caseId,
          token
        );
        if (!xRayResponse) {
          // setError(true);
          throw new Error("Failed to load Resized X-Ray");
        }
        // console.log("xRayResponse", xRayResponse);
        setXRayURL(xRayResponse.imageURL);
        setXRayPath(xRayResponse.resizedXRayPath); // Set X-Ray Path to the resized so that submission is done on the resized image
      } catch (error: any) {
        message.error("failed to load X-Ray");
        console.error("Error in fetchOriginalXRay(): ", error);
      }
    };

    const fetchXRayResultData = async () => {
      try {
        if (!xRayPath) {
          message.error("Failed to load X-Ray");
          throw new Error("No Xray Path Found");
        }

        // (1) Download XRay
        const xRayResponse = await downloadXRayFile(xRayPath, token);
        if (!xRayResponse) {
          // setError(true);
          message.error("Failed to load X-Ray");
          throw new Error("Failed to load X-Ray");
        }
        setXRayURL(xRayResponse);
        setXRayPath(xRayPath); // This is the X-Ray Path that will be used for submission

        // (2) Download Bounding Boxes
        if (!regionPath) {
          message.error("Failed to load Bounding Boxes");
          throw new Error("No Region Path Found");
        }
        const bBoxesResponse = await downloadBBoxesFile(regionPath, token);
        if (!bBoxesResponse) {
          // setError(true);
          message.error("Failed to load Bounding Boxes");
          throw new Error("Failed to load Bounding Boxes");
        }

        // (3) Download Bounding Boxes Findings
        if (!regionSentencePath) {
          message.error("Failed to load Bounding Boxes Findings");
          throw new Error("No Region Sentence Path Found");
        }
        const bBoxesFindingsResponse = await downloadBBoxesFindingsFile(
          regionSentencePath,
          token
        );
        if (!bBoxesFindingsResponse) {
          message.error("Failed to load Bounding Boxes Findings");
          throw new Error("Failed to load Bounding Boxes Findings");
        }
        // Merge Bounding Boxes and Bounding Boxes Findings
        bBoxesResponse.forEach((region, index) => {
          region.finding = bBoxesFindingsResponse[index];
        });
        handleSetAnnotations(bBoxesResponse);
      } catch (error: any) {
        // setError(true);
        setXRayURL(null);
        setXRayPath("");
        console.error("Error in fetchXRayResultData() : ", error);
      }
    };

    // // const fetchData = async (xRayOnly: boolean,downloadOriginalResized:boolean) => {
    // // const fetchData = async (
    // //   downloadOriginalXRay: boolean,
    // //   xRayOnly?: boolean
    // // ) => {
    // //   if (downloadOriginalXRay) {
    // //     try {
    // //       if (caseId) {
    // //         const xRayResponse = await downloadResizedOriginalXRayFile(
    // //           caseId,
    // //           token
    // //         );
    // //         console.log("xRayResponse", xRayResponse);
    // //         setXRayURL(xRayResponse);
    // //         // only download x-ray
    // //         return;
    // //       } else {
    // //         console.error("No case ID found");
    // //       }
    // //     } catch (error: any) {
    // //       console.error("Error fetching X-Ray: ", error);
    // //     }
    // //   } else {
    // //   }

    // // if (xRayPath) {
    // //   // console.log("xRayPath", xRayPath);
    // //   let fetchStartTime = Date.now(); // Record start time before fetch
    // //   setFetching(true);
    // //   setError(false); // Reset error state before starting the fetch

    // //   try {
    // //     const xRayResponse = await downloadXRayFile(xRayPath, token);
    // //     if (xRayResponse) {
    // //       setXRayURL(xRayResponse);
    // //       // hasXRay = true;

    // //       if (xRayOnly) {
    // //         // only download x-ray
    // //         return;
    // //       }

    // //       if (regionPath) {
    // //         try {
    // //           // console.log("regionPath", regionPath);
    // //           const bBoxesResponse = await downloadBBoxesFile(
    // //             regionPath,
    // //             token
    // //           );
    // //           if (bBoxesResponse) {
    // //             // Download the BB Findings
    // //             if (regionSentencePath) {
    // //               const bBoxesFindingsResponse =
    // //                 await downloadBBoxesFindingsFile(
    // //                   regionSentencePath,
    // //                   token
    // //                 );
    // //               if (bBoxesFindingsResponse) {
    // //                 // console.log("bBoxesFindingsResponse", bBoxesFindingsResponse);
    // //                 bBoxesResponse.forEach((region, index) => {
    // //                   region.finding = bBoxesFindingsResponse[index];
    // //                 });
    // //               } else {
    // //                 // Don't Set Error to true
    // //                 // setError(true);
    // //                 console.log("Error fetching bounding boxes findings");
    // //               }
    // //             }
    // //             handleSetAnnotations(bBoxesResponse);
    // //             // console.log("bBoxesResponse", bBoxesResponse);
    // //           } else {
    // //             // Don't Set Error to true
    // //             // setError(true);
    // //             message.error("Failed to load bounding boxes");
    // //           }
    // //         } catch (error: any) {
    // //           // Don't Set Error to true
    // //           // setError(true);
    // //           message.error("Failed to load bounding boxes");
    // //           console.log("Error fetching bounding boxes: ", error);
    // //         }
    // //       }
    // //     } else {
    // //       setError(true);
    // //       message.error("Failed to load X-Ray");
    // //     }
    // //   } catch (error: any) {
    // //     setError(true);
    // //     message.error("Error fetching X-Ray: " + error.message);
    // //   } finally {
    // //     // Calculate time elapsed since fetch started
    // //     let elapsedTime = Date.now() - fetchStartTime;
    // //     let delayTime = Math.max(0, 1000 - elapsedTime); // Ensure at least 1 second delay

    // //     if (delayTime === 0) {
    // //       // If fetch took longer than 1 second, set fetching to false immediately
    // //       setFetching(false);
    // //     } else {
    // //       // Otherwise, delay setting fetching to false by delayTime
    // //       setTimeout(() => {
    // //         setFetching(false);
    // //       }, delayTime);
    // //     }
    // //   }
    // // } else {
    // //   setFetching(false);
    // // }
    // // };

    // // // //   // let hasXRay = false;
    // // // // defien XrayPatha s string or null

    // // let xRayPath: string | null = null;
    // // let regionPath = "";
    // // let regionSentencePath = "";

    // Scenario(1) NoLLMResult and NoCustomResult
    if (!llmResultData && !customResultData) {
      fetchOriginalXRay();
      return;
    }

    // Scenario(2) useAI = true and LLMResultData
    let xRayPath: string | null = null;
    let regionPath = "";
    let regionSentencePath = "";

    if (useAI) {
      if (!llmResultData) {
        message.info("No AI results found for this case.................. >>>");
        return;
      }
      xRayPath = llmResultData?.xray_path;
      regionPath = llmResultData?.region_path;
      regionSentencePath = llmResultData?.region_sentence_path;
      fetchXRayResultData();
    } else {
      if (!customResultData) {
        message.info(
          "No custom results found for this case.................. >>>"
        );
        return;
      }
      // Check if he wants to use the de-noised image
      if (useDeNoisedImage && llmResultData?.xray_path) {
        message.info("Using De-Noised Image");
        xRayPath = llmResultData?.xray_path;
      } else {
        xRayPath = customResultData?.xray_path;
        message.info("Using Original Image");
      }
      regionPath = customResultData?.region_path;
      regionSentencePath = customResultData?.region_sentence_path;
      fetchXRayResultData();
    }

    // // if (useAI) {
    // //   if (!llmResultData) {
    // //     message.info("No AI results found for this case.");
    // //     // xRayPath = originalXRayPath;
    // //     // fetchData(true);
    // //     return;
    // //   }
    // //   xRayPath = llmResultData?.xray_path;
    // //   regionPath = llmResultData?.region_path;
    // //   regionSentencePath = llmResultData?.region_sentence_path;
    // // } else {
    // //   if (!customResultData) {
    // //     message.info("No custom results found for this case.");
    // //     // xRayPath = originalXRayPath;
    // //     // fetchData(true);
    // //     return;
    // //   }
    // //   xRayPath = customResultData?.xray_path;
    // //   regionPath = customResultData?.region_path;
    // //   regionSentencePath = customResultData?.region_sentence_path;
    // // }
    // // fetchData(false);
    // }, [llmResultData, customResultData]);
    // }, [useAI, llmResultData, customResultData]);
  }, [useAI, llmResultData, customResultData, useDeNoisedImage]);

  // Render Content based on the states
  // const Body = () => {
  //   let content;

  // if (xRayPath && fetching) {
  //   content = (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "80%",
  //         width: "100%",
  //       }}
  //     >
  //       {/* <Spin tip="Loading" size="small">
  //         <div
  //           style={{
  //             padding: 50,
  //             // background: "rgba(0, 0, 0, 0.05)",
  //             borderRadius: 4,
  //           }}
  //         />
  //       </Spin> */}
  //       <Spin indicator={<LoadingOutlined spin />} />
  //     </div>
  //   );
  // } else if (error || !xRayURL) {
  //   content = (
  //     <Result
  //       status="error"
  //       title="There are some problems with loading x-ray."
  //       extra={
  //         null
  //         //   <Button type="primary" key="console">
  //         //     Go Console
  //         //   </Button>
  //       }
  //     />
  //   );
  // } else {
  //   content = (
  //     <>
  //       <CanvasSection ImageURL={xRayURL} />
  //       {/* {siderType !== "info" && siderType !== "report" && ( */}
  //       {/* // <h1>Findings</h1> */}
  //       {/* <BBFindingsContainer>
  //         <BBFindings />
  //       </BBFindingsContainer> */}
  //       {/* )} */}
  //     </>
  //   );
  // }
  // content = <>{/* <CanvasSection ImageURL={xRayURL ?? ""} /> */}</>;

  // return (
  // <XRayContainer>
  //   <ToolBar />
  //   {/* {content} */}
  //   {/* <Test /> */}
  //   {/* <CanvasSection ImageURL={xRayURL ?? ""} /> */}
  // </XRayContainer>
  // );
  // };

  return (
    <ToolProvider>
      <StagePropertiesProvider>
        <XRaySectionContainer>
          <ToolBar
            disabled={!xRayURL}
            useDeNoisedImage={useDeNoisedImage}
            handleUseDeNoisedImage={handleUseDeNoisedImage}
          />
          {/* <Test /> */}
          <CanvasSection ImageURL={xRayURL ?? ""} />
        </XRaySectionContainer>
      </StagePropertiesProvider>
    </ToolProvider>
  );
}

export default XRaySection;
