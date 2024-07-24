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
  handleEditAnnotationRegionMapping: (
    box_id: string,
    region_id: number
  ) => void;
  handleEditAnnotationFinding: (id: string, finding: string) => void;
  existUnassigned: () => boolean;
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
  // const [annotations, setAnnotations] = useState<Region[]>([]);
  const [annotations, setAnnotations] = useState<Region[]>([]);

  useEffect(() => {
    // console.log("Annotations Provider ........", annotations);
    // const initialAnnotations = [
    //   {
    //     id: "01",
    //     // title: "Lung",
    //     title_id: 0,
    //     finding:
    //       "Lung volumes are slightly lower with associated crowding of bronchovascular structures.",
    //     ai: true,
    //     box: {
    //       x: 100,
    //       y: 100,
    //       width: 100,
    //       height: 50,
    //     },
    //   },
    //   {
    //     id: "02",
    //     // title: "Heart",
    //     title_id: 1,
    //     finding: "Heart is slightly enlarged.",
    //     ai: true,
    //     box: {
    //       x: 250,
    //       y: 150,
    //       width: 50,
    //       height: 50,
    //     },
    //   },
    // ];

    // const initialAnnotations: Region[] = []; // Explicitly specifying the type as Region[]
    // setAnnotations(initialAnnotations);
  }, []);

  const handleSetAnnotations = (newAnnotations: Region[]) => {
    setAnnotations(newAnnotations);
  };
  const handleAddAnnotation = (newAnnotation: Region) => {
    // console.log("Adding new annotation", newAnnotation);
    // check if width or height is 0
    if (newAnnotation.box.width === 0 || newAnnotation.box.height === 0) {
      // console.error("Width or height cannot be 0");
      // console.log("Width or height cannot be 0");
      return;
    }
    // Check if the first elemnt in the annotation array has id as NAN pop it
    if (annotations.length > 0 && isNaN(parseInt(annotations[0].id))) {
      // Problem with the first element is NAN initially
      // console.log("-================trapped");
      annotations.pop();
    }

    annotations.push(newAnnotation);
    setAnnotations(annotations);
  };

  const handleSelectAnnotation = (id: string | null) => {
    const annotation = annotations.find((annotation) => annotation.id === id);
    setSelectedAnnotation(annotation ? annotation : null);
  };

  /*eslint-disable */
  const handleCEditAnnotationTitle = (id: string, title: string) => {
    console.error("Edit Annotation Title not implemented");
    // const annotation = annotations.find((annotation) => annotation.id === id);
    // if (annotation) {
    //   annotation.title = title;
    //   setAnnotations([...annotations]);
    // }
  };

  const handleEditAnnotationRegionMapping = (
    box_id: string,
    region_id: number
  ) => {
    const annotation = annotations.find(
      (annotation) => annotation.id === box_id
    );
    // check if amy annoation has the same region_id
    const check = annotations.find(
      (annotation) => annotation.title_id === region_id
    );
    if (annotation && !check) {
      annotation.title_id = region_id;
      setAnnotations([...annotations]);
    } else {
      console.error(
        `Region ${region_id} already assigned to another annotation`
      );
    }
  };

  // check if some boxes are not assigned to any region
  const existUnassigned = () => {
    const unassigned = annotations.filter(
      (annotation) => annotation.title_id === -1
    );
    if (unassigned.length > 0) {
      console.error(
        `Some boxes are not assigned to any region: ${unassigned
          .map((annotation) => annotation.id)
          .join(", ")}`
      );
      return true;
    }
    return false;
  };

  const handleEditAnnotationFinding = (id: string, finding: string) => {
    const annotation = annotations.find((annotation) => annotation.id === id);
    if (annotation) {
      annotation.finding = finding;
      // annotation.ai = false;
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
        handleEditAnnotationRegionMapping,
        handleEditAnnotationFinding,
        existUnassigned,
      }}
    >
      {children}
    </AnnotationsContext.Provider>
  );
}

export default AnnotationProvider;
