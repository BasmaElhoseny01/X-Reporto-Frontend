import React, { createContext, useContext, useState } from "react";

// Types
import { Box } from "./XRaySection.types";

interface AnnotationsContextType {
  selectedAnnotation: string | null;
  handleSelectAnnotation: (id: string | null) => void;

  annotations: Box[];
  handleAddAnnotation: (newAnnotation: Box) => void;
  handleSetAnnotations: (newAnnotations: Box[]) => void;
}
// Create context with initial state
const AnnotationsContext = createContext<AnnotationsContextType | undefined>(
  undefined
);

// Custom hook to consume the context
export const useAnnotations = () => {
  const context = useContext(AnnotationsContext);
  if (!context) {
    throw new Error("useAnnotations must be used within a AnnotationsProvider");
  }
  return context;
};

// ToolProvider Props
type AnnotationsProviderProps = {
  children: React.ReactNode;
};

function AnnotationProvider(props: AnnotationsProviderProps) {
  const { children } = props;

  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(
    null
  );
  const [annotations, setAnnotations] = useState<Box[]>([]);

  const handleSelectAnnotation = (id: string | null) => {
    setSelectedAnnotation(id);
  };

  const handleSetAnnotations = (newAnnotations: Box[]) => {
    setAnnotations(newAnnotations);
  };
  const handleAddAnnotation = (newAnnotation: Box) => {
    annotations.push(newAnnotation);
    setAnnotations(annotations);
  };

  return (
    <AnnotationsContext.Provider
      value={{
        selectedAnnotation,
        handleSelectAnnotation,
        annotations,
        handleAddAnnotation,
        handleSetAnnotations,
      }}
    >
      {children}
    </AnnotationsContext.Provider>
  );
}

export default AnnotationProvider;
