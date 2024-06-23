import React from "react";

// Context
import ToolProvider from "./ToolProvider";
import AnnotationProvider from "./AnnotationProvider";

// Components
import ToolBar from "./ToolBar/ToolBar";
import CanvasSection from "./CanvasSection/CanvasSection";

// Styled Components
import { XRaySectionContainer } from "./XRaySection.Styles";


function XRaySection() {
  return (
    <ToolProvider>
      <AnnotationProvider>
        <XRaySectionContainer>
          <ToolBar />
          <CanvasSection />
        </XRaySectionContainer>
      </AnnotationProvider>
    </ToolProvider>
  );
}

export default XRaySection;
