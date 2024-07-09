/* eslint-disable*/
import React, { useEffect } from "react";

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

// Interfaces
interface XRaySectionProps {
  // Props Here
  xReportoResultId: number;
}

// Server Fetch
const fetchBoundingBox = async (result_id: string) => {
  try {
    // const response = await axios.get(`/api/v1/studies/${id}`);
    // return response.data;
  } catch (error) {
    console.log("Error fetching Bounding Box: ", error);
  }
};
function XRaySection(props: XRaySectionProps) {
  const { xReportoResultId } = props;
  // const { infoCollapsed, reportCollapsed } = useView();
  const { siderType } = useView();

  useEffect(() => {
    if (xReportoResultId) {
      console.log("xReportoResultId", xReportoResultId);
      // fetchStudy(id).then((response) => {
      //   console.log(response);
      //   ChangeCase(response);
      // });
    }
  }, [xReportoResultId]);

  return (
    <ToolProvider>
      <h1>sdd</h1>
      {/* <AnnotationProvider>
        <StagePropertiesProvider>
          <XRaySectionContainer>
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
          </XRaySectionContainer>
        </StagePropertiesProvider>
      </AnnotationProvider> */}
    </ToolProvider>
  );
}

export default XRaySection;
