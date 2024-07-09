/* eslint-disable*/
import React, { useEffect, useState } from "react";

// Context
import ToolProvider from "./ToolProvider";
import AnnotationProvider, { useAnnotations } from "./AnnotationProvider";
import StagePropertiesProvider from "./StagePropertiesProvider";
import { useView } from "../ViewProvider";

// Antd Components

// Components
import ToolBar from "./ToolBar/ToolBar";
import CanvasSection from "./CanvasSection/CanvasSection";
import BBFindings from "./BBFindings/BBFindings";

// Styled Components
import {
  XRaySectionContainer,
  BBFindingsContainer,
  XRayContainer,
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
import { Box, Region } from "./XRaySection.types";
// Interfaces
interface XRaySectionProps {
  // Props Here
  xRayPath: string | null;
  regionPath: string | null;
}

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
    console.log("Error fetching X-Ray: ", error);
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
        title: anatomicalRegionsIndexToKey[regionId],
        finding: "",
        ai: false,
        box: boundingBox,
      });
    });

    return regions;
  } catch (error) {
    console.log("Error fetching Bounding Boxes: ", error);
    return null;
  }
};

function XRaySection(props: XRaySectionProps) {
  const { xRayPath, regionPath } = props;

  // Navigation
  const { navigateToHome } = useCustomNavigate();

  // Redux States
  const token = useSelector((state: MainState) => state.token);

  // const { infoCollapsed, reportCollapsed } = useView();
  const { siderType } = useView();

  // const [xRayData, setXRayData] = useState(null);
  const [xRayURL, setXRayURL] = useState<string | null>(null);
  const { handleSetAnnotations } = useAnnotations();
  // const [bbData, setBBData] = useState(null);

  const [fetching, setFetching] = useState(true); // Initially set fetching to true
  const [error, setError] = useState(false);

  useEffect(() => {
    // console.log("XRaySection", xRayPath, regionPath);
    // let hasXRay = false;

    const fetchData = async () => {
      if (xRayPath) {
        // console.log("xRayPath", xRayPath);
        let fetchStartTime = Date.now(); // Record start time before fetch
        setFetching(true);
        setError(false); // Reset error state before starting the fetch

        try {
          const xRayResponse = await downloadXRayFile(xRayPath, token);
          if (xRayResponse) {
            setXRayURL(xRayResponse);
            // hasXRay = true;

            if (regionPath) {
              try {
                // console.log("regionPath", regionPath);
                const bBoxesResponse = await downloadBBoxesFile(
                  regionPath,
                  token
                );
                if (bBoxesResponse) {
                  handleSetAnnotations(bBoxesResponse);
                } else {
                  // Don't Set Error to true
                  // setError(true);
                  message.error("Failed to load bounding boxes");
                }
              } catch (error: any) {
                // Don't Set Error to true
                // setError(true);
                message.error("Failed to load bounding boxes");
                console.log("Error fetching bounding boxes: ", error);
              }
            }
          } else {
            setError(true);
            message.error("Failed to load X-Ray");
          }
        } catch (error: any) {
          setError(true);
          message.error("Error fetching X-Ray: " + error.message);
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
  }, [xRayPath, regionPath]);

  // // Render Content based on the states
  // const Body = () => {
  //   let content;

  //   if (xRayPath && fetching) {
  //     content = (
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "80%",
  //           width: "100%",
  //         }}
  //       >
  //         {/* <Spin tip="Loading" size="small">
  //           <div
  //             style={{
  //               padding: 50,
  //               // background: "rgba(0, 0, 0, 0.05)",
  //               borderRadius: 4,
  //             }}
  //           />
  //         </Spin> */}
  //         <Spin indicator={<LoadingOutlined spin />} />
  //       </div>
  //     );
  //   } else if (error || !xRayURL) {
  //     content = (
  //       <Result
  //         status="error"
  //         title="There are some problems with loading x-ray."
  //         extra={
  //           null
  //           //   <Button type="primary" key="console">
  //           //     Go Console
  //           //   </Button>
  //         }
  //       />
  //     );
  //   } else {
  //     content = (
  //       <>
  //         <CanvasSection ImageURL={xRayURL} />
  //         {siderType !== "info" && siderType !== "report" && (
  //           <h1>Findings</h1>
  //           // <BBFindingsContainer>
  //           //   <BBFindings />
  //           // </BBFindingsContainer>
  //         )}
  //       </>
  //     );
  //   }

  //   return (
  //     <XRayContainer>
  //       <ToolBar />
  //       {content}
  //     </XRayContainer>
  //   );
  // };

  return (
    <ToolProvider>
      {/* <AnnotationProvider> */}
      <StagePropertiesProvider>
        <XRaySectionContainer>
          {/* <Body /> */}
          <XRayContainer>
            <ToolBar />
            <>
              <CanvasSection ImageURL={xRayURL ?? ""} />
              {siderType !== "info" && siderType !== "report" && (
                <h1>Findings</h1>
                // <BBFindingsContainer>
                //   <BBFindings />
                // </BBFindingsContainer>
              )}
            </>
          </XRayContainer>
        </XRaySectionContainer>
      </StagePropertiesProvider>
      {/* </AnnotationProvider> */}
    </ToolProvider>
  );
}

export default XRaySection;
