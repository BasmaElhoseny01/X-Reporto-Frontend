import React, { useEffect, useState } from "react";

// Third Party Components
import { Layer, Stage } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

// Components
import ImageFromUrl from "./ImageFromURL/ImageFromURL";
import AnnotationBox from "./AnnotationBox/AnnotationBox";

// Context
import { useTools } from "../ToolProvider";
import { useAnnotations } from "../AnnotationProvider";
import { useStageProperties } from "../StagePropertiesProvider";
import { useView } from "../../ViewProvider";

// Assets
import XRay from "../../../../../../assets/images/resized.jpg";

// Types
import { Region } from "../XRaySection.types";
import { Vector2d } from "konva/lib/types";

let idCounter = 0;
const generateId = () => (++idCounter).toString();

function CanvasSection() {
  // UseStates
  const [canvasMeasures, setCanvasMeasures] = useState({
    // width: window.innerWidth,
    // height: window.innerHeight,
    width: 0,
    height: 0,
  });
  const [newAnnotation, setNewAnnotation] = useState<Region[]>([]);

  // Context Providers
  const { navTool, hideBoxes } = useTools();
  const { stageProperties, handleSetStageProperties } = useStageProperties();
  const {
    selectedAnnotation,
    handleSelectAnnotation,
    annotations,
    handleAddAnnotation,
    handleSetAnnotations,
  } = useAnnotations();

  // const { handleSetInfoCollapsed, handleSetReportCollapsed } = useView();
  const { handleSetSiderType } = useView();

  useEffect(() => {}, []);

  const adjustPointerPosition = (pointerPosition: Vector2d) => {
    const { stageScale, stageX, stageY } = stageProperties;
    return {
      x: (pointerPosition.x - stageX) / stageScale,
      y: (pointerPosition.y - stageY) / stageScale,
    };
  };

  const handleMouseEnter = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    if (stage) {
      if (navTool === "select" || navTool === "move") {
        stage.container().style.cursor = "default";
      } else if (navTool === "draw") {
        stage.container().style.cursor = "crosshair";
      } else if (navTool === "zoom") {
        stage.container().style.cursor = "zoom-in";
      }
    }
  };

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (selectedAnnotation === null && newAnnotation.length === 0) {
      const pointerPosition = event.target.getStage()?.getPointerPosition();
      if (pointerPosition && navTool === "draw") {
        // Adjust pointer position to canvas scale (For zoomed canvas)
        const adjustedPointerPosition = adjustPointerPosition(pointerPosition);
        const { x, y } = adjustedPointerPosition;

        // // Check if the click is inside the canvas
        // if (
        //   x >= 0 &&
        //   y >= 0 &&
        //   x <= canvasMeasures.width &&
        //   y <= canvasMeasures.height
        // ) {
        const id = generateId();
        setNewAnnotation([
          {
            id,
            title: `Region(${id})`,
            finding: "",
            ai: false,
            box: {
              x,
              y,
              width: 0,
              height: 0,
            },
          },
        ]);
        console.log("Down: newAnnotation", newAnnotation);
        // }
      }
      if (pointerPosition && navTool === "zoom") {
        console.log("Zoom in", pointerPosition);
        const stage = event.target.getStage();
        if (stage) {
          stage.setPointersPositions(event.evt);
          stage.startDrag();
        }
      }
    }
  };

  const handleMouseUp = (event: KonvaEventObject<MouseEvent>) => {
    if (
      selectedAnnotation === null &&
      newAnnotation.length === 1 &&
      navTool === "draw"
    ) {
      handleAddAnnotation(newAnnotation[0]);
      setNewAnnotation([]);
      console.log("Up: annotations", annotations);
    } else if (navTool === "zoom") {
      const stage = event.target.getStage();
      if (stage && stage.isDragging()) {
        stage.stopDrag();
      }
    }
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (
      selectedAnnotation === null &&
      newAnnotation.length === 1 &&
      navTool === "draw"
    ) {
      const sx = newAnnotation[0].box.x;
      const sy = newAnnotation[0].box.y;
      const pointerPosition = event.target.getStage()?.getPointerPosition();
      if (pointerPosition) {
        // Adjust pointer position to canvas scale (For zoomed canvas)
        const adjustedPointerPosition = adjustPointerPosition(pointerPosition);
        const { x, y } = adjustedPointerPosition;
        // // Check if the click is inside the canvas
        // if (
        //   x >= 0 &&
        //   y >= 0 &&
        //   x <= canvasMeasures.width &&
        //   y <= canvasMeasures.height
        // ) {

        const id = generateId();
        setNewAnnotation([
          {
            id,
            title: `Region(${id})`,
            finding: "",
            ai: false,
            box: {
              x: sx,
              y: sy,
              width: x - sx,
              height: y - sy,
            },
          },
        ]);
        // }
      }
    } else if (navTool === "zoom") {
      const stage = event.target.getStage();
      if (stage && stage.isDragging()) {
        const dragMoveDist = stage.getPointerPosition() || { x: 0, y: 0 };
        handleSetStageProperties({
          stageScale: stageProperties.stageScale,
          stageX: dragMoveDist.x,
          stageY: dragMoveDist.y,
        });
      }
    }
  };

  const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
    if (navTool !== "zoom") return;
    // Prevent default zoom
    event.evt.preventDefault();
    const scaleBy = 1.02;
    const stage = event.target.getStage();
    if (stage) {
      const oldScale = stage.scaleX();

      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        const mousePointTo = {
          x: pointerPosition.x / oldScale - stage.x() / oldScale,
          y: pointerPosition.y / oldScale - stage.y() / oldScale,
        };

        const newScale =
          event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        // Set stage properties
        handleSetStageProperties({
          stageScale: newScale,
          stageX: -(mousePointTo.x - pointerPosition.x / newScale) * newScale,
          stageY: -(mousePointTo.y - pointerPosition.y / newScale) * newScale,
        });
      }
    }
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];
  return (
    <Stage
      // width={canvasMeasures.width}
      // height={canvasMeasures.height}
      width={canvasMeasures.width}
      height={canvasMeasures.height}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      scaleX={stageProperties.stageScale}
      scaleY={stageProperties.stageScale}
      x={stageProperties.stageX}
      y={stageProperties.stageY}
      onWheel={handleWheel}
    >
      <Layer>
        <ImageFromUrl
          setCanvasMeasures={setCanvasMeasures}
          imageUrl={XRay}
          onMouseDown={() => {
            // deselect when clicked on empty area
            handleSelectAnnotation(null);
          }}
        />
        {!hideBoxes &&
          annotationsToDraw.map((annotation, i) => {
            return (
              <AnnotationBox
                key={i}
                shapeProps={annotation.box}
                title={annotation.title}
                isSelected={annotation.id === selectedAnnotation?.id}
                onSelect={() => {
                  if (navTool !== "draw" && navTool !== "zoom") {
                    handleSelectAnnotation(annotation.id);

                    handleSetSiderType("info");

                    // Collapse Info
                    // handleSetInfoCollapsed(true);
                    // UnCollapse Report
                    // handleSetReportCollapsed(true);
                  }
                }}
                onMouseLeave={handleMouseEnter}
                onChange={(newAttrs) => {
                  const rects = annotations.slice();
                  rects[i].box = newAttrs;
                  // setAnnotations(rects);
                  handleSetAnnotations(rects);
                }}
              />
            );
          })}
      </Layer>
    </Stage>
  );
}

export default CanvasSection;
