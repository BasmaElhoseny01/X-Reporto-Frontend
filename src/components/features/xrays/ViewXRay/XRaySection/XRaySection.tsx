import React from "react";

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

function XRaySection() {
  // const { infoCollapsed, reportCollapsed } = useView();
  const { siderType } = useView();

  return (
    <ToolProvider>
      <AnnotationProvider>
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
      </AnnotationProvider>
    </ToolProvider>
  );
}

export default XRaySection;
