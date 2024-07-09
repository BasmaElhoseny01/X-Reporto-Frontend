/* eslint-disable*/
import React, { useEffect, useState } from "react";

// Context
import ToolProvider from "./ToolProvider";
import AnnotationProvider from "./AnnotationProvider";
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
import axios from "axios";
import { MainState } from "../../../../../state";
import { useSelector } from "react-redux";
import useCustomNavigate from "../../../../../hooks/useCustomNavigate";
import { message, Result, Spin } from "antd";
import PrimaryButton from "../../../../common/PrimaryButton/PrimaryButton";

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
      responseType: "text", // check (Basma)
    });
    return response.data;
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
    return response.data;
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

  const [bbData, setBBData] = useState(null);
  const [xRayData, setXRayData] = useState(null);

  const [fetching, setFetching] = useState(true); // Initially set fetching to true
  const [error, setError] = useState(false);

  useEffect(() => {
    let hasXRay = false;

    if (xRayPath) {
      console.log("xRayPath", xRayPath);
      // DownLoad Region Paths
      setFetching(true);
      setError(false); // Reset error state before starting the fetch

      const fetchPromise = downloadXRayFile(xRayPath, token).then(
        (response) => {
          if (response) {
            console.log(response);
            setXRayData(response);
            hasXRay = true;
          } else {
            setError(true);
            message.error("Failed to fetch X-Ray");
          }
        }
      );

      const timeoutPromise = new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      Promise.all([fetchPromise, timeoutPromise]).finally(() => {
        setFetching(false);
      });
    } else {
      setFetching(false);
    }

    if (hasXRay && regionPath) {
      // DownLoad Region Paths
      setFetching(true);
      setError(false); // Reset error state before starting the fetch

      console.log(regionPath);
      const fetchPromise = downloadBBoxesFile(regionPath, token).then(
        (response) => {
          if (response) {
            console.log(response);
            setBBData(response);
          } else {
            setError(true);
            message.error("Failed to fetch bounding boxes.");
          }
        }
      );

      const timeoutPromise = new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      Promise.all([fetchPromise, timeoutPromise]).finally(() => {
        setFetching(false);
      });
    } else {
      setFetching(false);
    }
  }, [xRayPath, regionPath]);

  // Render Content based on the states
  const Body = () => {
    if (xRayPath && fetching) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
            width: "100%",
          }}
        >
          {" "}
          <Spin tip="Loading" size="small">
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
    if (error || !xRayData) {
      return (
        <XRayContainer>
          <ToolBar />
          <Result
            status="error"
            title="There are some problems with loading x-ray."
            extra={
              null
              //   <Button type="primary" key="console">
              //     Go Console
              //   </Button>
            }
          />
        </XRayContainer>
      );
    }

    return (
      <>
        <XRayContainer>
          <ToolBar />
          <CanvasSection />
        </XRayContainer>
        {siderType != "info" && siderType != "report" && (
          <>
            <BBFindingsContainer>
              <BBFindings />
            </BBFindingsContainer>
          </>
        )}
      </>
    );
  };

  return (
    <ToolProvider>
      <AnnotationProvider>
        <StagePropertiesProvider>
          <XRaySectionContainer>
            <Body />
          </XRaySectionContainer>
        </StagePropertiesProvider>
      </AnnotationProvider>
    </ToolProvider>
  );
}

export default XRaySection;
