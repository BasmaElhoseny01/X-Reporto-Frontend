import React from "react";

// Context
import ToolProvider from "./ToolProvider";
import AnnotationProvider from "./AnnotationProvider";
import StagePropertiesProvider from "./StagePropertiesProvider";

// Antd Components

// Components
import ToolBar from "./ToolBar/ToolBar";
import CanvasSection from "./CanvasSection/CanvasSection";

// Styled Components
import {
  XRaySectionContainer,
  BBFindingsContainer,
  XRayContainer,
} from "./XRaySection.Styles";
import BBFindings from "./BBFindings/BBFindings";

function XRaySection() {
  return (
    <ToolProvider>
      <AnnotationProvider>
        <StagePropertiesProvider>
          <XRaySectionContainer>
            <XRayContainer>
              <ToolBar />
              <CanvasSection />
            </XRayContainer>
            <BBFindingsContainer>
              <BBFindings  />
            </BBFindingsContainer>
          </XRaySectionContainer>
        </StagePropertiesProvider>
      </AnnotationProvider>
    </ToolProvider>
  );
}

export default XRaySection;
