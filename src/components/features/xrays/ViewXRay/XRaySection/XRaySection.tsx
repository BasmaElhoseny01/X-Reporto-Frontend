import React from "react";

// Context
import ToolProvider from "./ToolProvider";
import AnnotationProvider from "./AnnotationProvider";
import StagePropertiesProvider from "./StagePropertiesProvider";

// Components
import ToolBar from "./ToolBar/ToolBar";
import CanvasSection from "./CanvasSection/CanvasSection";

// Styled Components
import { XRaySectionContainer } from "./XRaySection.Styles";

function XRaySection() {
  return (
    <ToolProvider>
      <AnnotationProvider>
        <StagePropertiesProvider>
          <XRaySectionContainer>
            <ToolBar />
            <CanvasSection />
          </XRaySectionContainer>
        </StagePropertiesProvider>
      </AnnotationProvider>
    </ToolProvider>
  );
}

export default XRaySection;
