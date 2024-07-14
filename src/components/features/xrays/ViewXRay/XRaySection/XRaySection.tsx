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
  // setUseAI: (data: boolean) => void;
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
    console.log("XRaySection .........", useAI, useDeNoisedImage);

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

    const fetchXRayResultData = async (download_image_only = false) => {
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
        console.log("xRayResponse", xRayResponse);
        setXRayURL(xRayResponse);
        setXRayPath(xRayPath); // This is the X-Ray Path that will be used for submission
        if (download_image_only) return;

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

    const fetchXRayResultRegions = async () => {
      try {
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
        console.error("Error in fetchXRayResultRegions() : ", error);
      }
    };

    let xRayPath: string | null = null;
    let regionPath = "";
    let regionSentencePath = "";

    // Scenario(1) NoLLMResult and NoCustomResult
    // 0 0
    if (!llmResultData && !customResultData) {
      message.info("Using Original Image");
      fetchOriginalXRay();
      return;
    }

    // 1 1
    if (llmResultData && customResultData) {
      if (useAI) {
        xRayPath = llmResultData.xray_path;
        message.info("Using De-Noised Image");

        regionPath = llmResultData.region_path;
        regionSentencePath = llmResultData.region_sentence_path;
        fetchXRayResultData();
      } else {
        // Check if he wants to use the de-noised image
        if (useDeNoisedImage) {
          xRayPath = llmResultData.xray_path;
          message.info("Using De-Noised Image");
          regionPath = customResultData.region_path;
          regionSentencePath = customResultData.region_sentence_path;
          fetchXRayResultData();
        } else {
          message.info("Using Original Image");
          regionPath = customResultData.region_path;
          regionSentencePath = customResultData.region_sentence_path;
          fetchOriginalXRay();
          fetchXRayResultRegions();
        }
      }
      return;
    }
    // 1 0
    if (llmResultData) {
      if (useAI) {
        xRayPath = llmResultData.xray_path;
        message.info("Using De-Noised Image");
        regionPath = llmResultData.region_path;
        regionSentencePath = llmResultData.region_sentence_path;
        fetchXRayResultData();
      } else {
        // !useAI
        if (useDeNoisedImage) {
          xRayPath = llmResultData.xray_path;
          message.info("Using De-Noised Image");
          regionPath = llmResultData.region_path;
          regionSentencePath = llmResultData.region_sentence_path;
          fetchXRayResultData();
        } else {
          message.info("Using Original Image");
          regionPath = llmResultData.region_path;
          regionSentencePath = llmResultData.region_sentence_path;
          fetchOriginalXRay();
        }
      }
      // message.error("No LM Result (<>)");
      return;
    }

    // 0 1
    if (customResultData) {
      // no LLMResultData !!!
      // Then just read the customResultData  that will be the original :)
      xRayPath = customResultData.xray_path;
      message.info("Using Custom Image");
      regionPath = customResultData.region_path;
      regionSentencePath = customResultData.region_sentence_path;
      fetchXRayResultData();
    }

    // if (llmResultData) {
    //   return;
    // }

    // if (customResultData) {
    //   return;
    // }

    // // Scenario(2) useAI = true and LLMResultData
    // let xRayPath: string | null = null;
    // let regionPath = "";
    // let regionSentencePath = "";

    // if (useAI) {
    //   if (!llmResultData) {
    //     message.info("using Original image");
    //     fetchOriginalXRay();
    //     return;
    //   }
    //   message.info("Using De-Noised Image");
    //   xRayPath = llmResultData?.xray_path;
    //   regionPath = llmResultData?.region_path;
    //   regionSentencePath = llmResultData?.region_sentence_path;
    //   fetchXRayResultData();
    // } else {
    //   // Scenario useAI = false
    //   // Scenario(1) no CustomResultData
    //   if (!customResultData) {
    //     // Check if he wants to use the de-noised image and LLMResultData is present
    //     if (useDeNoisedImage && llmResultData?.xray_path) {
    //       message.info("Using De-Noised Image");
    //       xRayPath = llmResultData?.xray_path;
    //       fetchXRayResultData(true);
    //       return;
    //     } else {
    //       message.info("Using Original Image");
    //       fetchOriginalXRay();
    //       return;
    //     }
    //   }
    //   // Check if he wants to use the de-noised image
    //   if (useDeNoisedImage && llmResultData?.xray_path) {
    //     // Scenario(2) CustomResultData && llmResultData
    //     message.info("Using De-Noised Image");
    //     fetchOriginalXRay();

    //     // xRayPath = llmResultData?.xray_path;
    //     console.log(llmResultData);
    //   } else {
    //     // Scenario(2) CustomResultData && !llmResultData || !useDeNoisedImage
    //     console.log(customResultData);
    //     xRayPath = customResultData?.xray_path;
    //     message.info("Using Original Image");
    //   }
    //   regionPath = customResultData?.region_path;
    //   regionSentencePath = customResultData?.region_sentence_path;
    //   fetchXRayResultData();
    // }
    // // }, [useAI, llmResultData, customResultData, useDeNoisedImage]);
  }, [useAI, useDeNoisedImage]);

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
