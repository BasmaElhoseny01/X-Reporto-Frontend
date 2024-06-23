import React from "react";

// Context
import ToolProvider from "./ToolProvider";

// Components
import ToolBar from "./ToolBar/ToolBar";
import CanvasSection from "./CanvasSection/CanvasSection";

// Styled Components
import { XRaySectionContainer } from "./XRaySection.Styles";

function XRaySection() {
  return (
    <ToolProvider>
      <XRaySectionContainer>
        <ToolBar />
        <CanvasSection />
      </XRaySectionContainer>
    </ToolProvider>
  );
}

export default XRaySection;
