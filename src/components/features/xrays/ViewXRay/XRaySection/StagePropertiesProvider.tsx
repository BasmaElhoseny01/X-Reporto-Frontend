import React, { createContext, useContext, useState } from "react";

// Types
import { stagePropertiesType } from "../XRay.types";

interface StagePropertiesContextType {
  stageProperties: stagePropertiesType;
  handleSetStageProperties: (newStageProperties: stagePropertiesType) => void;
}
// Create context with initial state
const StagePropertiesContext = createContext<
  StagePropertiesContextType | undefined
>(undefined);

// Custom hook to consume the context
export const useStageProperties = () => {
  const context = useContext(StagePropertiesContext);
  if (!context) {
    throw new Error(
      "useStageProperties must be used within a StagePropertiesProvider"
    );
  }
  return context;
};

// StagePropertiesProvider Props
type StagePropertiesProviderProps = {
  children: React.ReactNode;
};

function StagePropertiesProvider(props: StagePropertiesProviderProps) {
  const { children } = props;

  const [stageProperties, setStageProperties] = useState<stagePropertiesType>({
    stageScale: 1,
    stageX: 0,
    stageY: 0,
  });

  const handleSetStageProperties = (
    newStageProperties: stagePropertiesType
  ) => {
    setStageProperties(newStageProperties);
  };

  return (
    <StagePropertiesContext.Provider
      value={{
        stageProperties,
        handleSetStageProperties,
      }}
    >
      {children}
    </StagePropertiesContext.Provider>
  );
}

export default StagePropertiesProvider;
