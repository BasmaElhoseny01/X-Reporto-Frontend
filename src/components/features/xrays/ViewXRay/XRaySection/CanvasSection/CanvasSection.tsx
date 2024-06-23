import React, { useState } from "react";

// Third Party Components
import { Layer, Stage } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

// Components
import ImageFromUrl from "./ImageFromURL/ImageFromURL";
import AnnotationBox from "./AnnotationBox/AnnotationBox";

// Context
import { useTools } from "../ToolProvider";

// Assets
import XRay from "../../../../../../assets/images/resized.jpg";

// Types
type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
};

let idCounter = 0;
const generateId = () => (++idCounter).toString();

// Initial BBs
const initialAnnotations = [
  {
    x: 10,
    y: 10,
    width: 0,
    height: 0,
    id: generateId(),
  },
  {
    x: 150,
    y: 150,
    width: 0,
    height: 0,
    id: generateId(),
  },
];

function CanvasSection() {
  // UseStates
  const [canvasMeasures, setCanvasMeasures] = useState({
    // width: window.innerWidth,
    // height: window.innerHeight,
    width: 0,
    height: 0,
  });

  const [selectedId, selectAnnotation] = useState<string | null>(null);
  const [newAnnotation, setNewAnnotation] = useState<Box[]>([]);
  const [annotations, setAnnotations] = useState(initialAnnotations);

  // Tool Provider
  const { navTool } = useTools();

  const handleMouseEnter = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    if (stage) {
      if (navTool === "select" || navTool === "move") {
        stage.container().style.cursor = "default";
      } else if (navTool === "draw") {
        stage.container().style.cursor = "crosshair";
      }
    }
  };

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (selectedId === null && newAnnotation.length === 0) {
      const pointerPosition = event.target.getStage()?.getPointerPosition();
      if (pointerPosition && navTool === "draw") {
        const { x, y } = pointerPosition;
        const id = generateId();
        setNewAnnotation([{ x, y, width: 0, height: 0, id }]);

        console.log("Down: newAnnotation", newAnnotation);
      }
    }
  };

  const handleMouseUp = () => {
    if (
      selectedId === null &&
      newAnnotation.length === 1 &&
      navTool === "draw"
    ) {
      annotations.push(...newAnnotation);
      setAnnotations(annotations);
      setNewAnnotation([]);
      console.log("Up: annotations", annotations);
    }
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (
      selectedId === null &&
      newAnnotation.length === 1 &&
      navTool === "draw"
    ) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const pointerPosition = event.target.getStage()?.getPointerPosition();
      if (pointerPosition) {
        const { x, y } = pointerPosition;
        const id = generateId();
        setNewAnnotation([
          {
            x: sx,
            y: sy,
            width: x - sx,
            height: y - sy,
            id,
          },
        ]);
      }
    }
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];

  return (
    <Stage
      // width={canvasMeasures.width}
      width={canvasMeasures.width}
      // height={canvasMeasures.height}
      height={canvasMeasures.height}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Layer>
        <ImageFromUrl
          setCanvasMeasures={setCanvasMeasures}
          imageUrl={XRay}
          onMouseDown={() => {
            // deselect when clicked on empty area
            selectAnnotation(null);
          }}
        />
        {annotationsToDraw.map((annotation, i) => {
          return (
            <AnnotationBox
              key={i}
              shapeProps={annotation}
              isSelected={annotation.id === selectedId}
              onSelect={() => {
                if (navTool === "select") {
                  selectAnnotation(annotation.id);
                }
              }}
              onMouseLeave={handleMouseEnter}
              onChange={(newAttrs) => {
                const rects = annotations.slice();
                rects[i] = newAttrs;
                setAnnotations(rects);
              }}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}

export default CanvasSection;
