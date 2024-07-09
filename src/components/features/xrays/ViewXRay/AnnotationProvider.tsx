import React, { createContext, useContext, useEffect, useState } from "react";

// Types
import { Region } from "./XRay.types";

interface AnnotationsContextType {
  selectedAnnotation: Region | null;
  handleSelectAnnotation: (id: string | null) => void;

  annotations: Region[];
  handleSetAnnotations: (newAnnotations: Region[]) => void;
  handleAddAnnotation: (newAnnotation: Region) => void;
  handleRemoveAnnotation: (id: string) => void;

  handleCEditAnnotationTitle: (id: string, title: string) => void;
  handleEditAnnotationFinding: (id: string, finding: string) => void;
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

  const [selectedAnnotation, setSelectedAnnotation] = useState<Region | null>(
    null
  );
  const [annotations, setAnnotations] = useState<Region[]>([]);

  useEffect(() => {
    // const initialAnnotations = [
    // {
    //   id: "01",
    //   title: "Lung",
    //   finding:
    //     "Lung volumes are slightly lower with associated crowding of bronchovascular structures.",
    //   ai: true,
    //   box: {
    //     x: 100,
    //     y: 100,
    //     width: 100,
    //     height: 50,
    //   },
    // },
    // {
    //   id: "02",
    //   title: "Heart",
    //   finding: "Heart is slightly enlarged.",
    //   ai: true,
    //   box: {
    //     x: 250,
    //     y: 150,
    //     width: 50,
    //     height: 50,
    //   },
    // },
    // ];

    const initialAnnotations: Region[] = []; // Explicitly specifying the type as Region[]
    setAnnotations(initialAnnotations);
  }, []);

  const handleSetAnnotations = (newAnnotations: Region[]) => {
    setAnnotations(newAnnotations);
  };
  const handleAddAnnotation = (newAnnotation: Region) => {
    annotations.push(newAnnotation);
    setAnnotations(annotations);
  };

  const handleSelectAnnotation = (id: string | null) => {
    const annotation = annotations.find((annotation) => annotation.id === id);
    setSelectedAnnotation(annotation ? annotation : null);
  };

  const handleCEditAnnotationTitle = (id: string, title: string) => {
    const annotation = annotations.find((annotation) => annotation.id === id);
    if (annotation) {
      annotation.title = title;
      setAnnotations([...annotations]);
    }
  };

  const handleEditAnnotationFinding = (id: string, finding: string) => {
    const annotation = annotations.find((annotation) => annotation.id === id);
    if (annotation) {
      annotation.finding = finding;
      annotation.ai = false;
      setAnnotations([...annotations]);
    }
  };

  const handleRemoveAnnotation = (id: string) => {
    const newAnnotations = annotations.filter(
      (annotation) => annotation.id !== id
    );
    setAnnotations(newAnnotations);
  };
  return (
    <AnnotationsContext.Provider
      value={{
        selectedAnnotation,
        handleSelectAnnotation,
        annotations,
        handleSetAnnotations,
        handleAddAnnotation,
        handleRemoveAnnotation,
        handleCEditAnnotationTitle,
        handleEditAnnotationFinding,
      }}
    >
      {children}
    </AnnotationsContext.Provider>
  );
}

export default AnnotationProvider;
