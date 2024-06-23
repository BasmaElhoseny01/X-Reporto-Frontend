import React, { useEffect, useRef } from "react";

// Third Party Components
import Konva from "konva";
import { Rect, Transformer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

// Utils
import { hexToRgba } from "../../../../../../../utils";
// Props
interface AnnotationBoxProps {
  shapeProps: any;

  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}
// Context
import { useTools } from "../../ToolProvider";

// Styles
import { palette } from "../../../../../../../styles/theme";

function AnnotationBox(props: AnnotationBoxProps) {
  const { shapeProps, isSelected, onSelect, onChange } = props;

  // Tool Provider
  const { navTool } = useTools();

  const shapeRef = useRef<Konva.Rect>(null);
  const transformRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      if (transformRef.current && shapeRef.current) {
        transformRef.current.nodes([shapeRef.current]);
        transformRef.current.getLayer()?.batchDraw();
      }
    }
  }, [isSelected]);

  const onMouseEnter = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    if (stage) {
      if (navTool === "select") {
        stage.container().style.cursor = "pointer";
      } else if (navTool === "move") {
        stage.container().style.cursor = "move";
      } else if (navTool === "draw") {
        stage.container().style.cursor = "crosshair";
      }
    }
  };

  const onMouseLeave = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    if (stage) {
      if (navTool === "select") {
        stage.container().style.cursor = "context-menu";
      } else if (navTool === "move") {
        stage.container().style.cursor = "context-menu";
      } else if (navTool === "draw") {
        stage.container().style.cursor = "crosshair";
      }
      // stage.container().style.cursor = "crosshair";
    }
  };

  return (
    <>
      <Rect
        fill={isSelected ? `${hexToRgba(palette.primary, 0.1)}` : "transparent"}
        stroke={isSelected ? `${palette.primary}` : `${palette.error}`}
        onMouseDown={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDragEnd={(event: any) => {
          onChange({
            ...shapeProps,
            x: event.target.x(),
            y: event.target.y(),
          });
        }}
        onTransformEnd={() => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node?.scaleX() ?? 1;
          const scaleY = node?.scaleY() ?? 1;

          // we will reset it back
          node?.scaleX(1);
          node?.scaleY(1);
          onChange({
            ...shapeProps,
            x: node?.x(),
            y: node?.y(),
            // set minimal value
            // set minimal value
            width: Math.max(5, (node?.width() ?? 5) * scaleX),
            height: Math.max(5, (node?.height() ?? 5) * scaleY),
          });
        }}
      />
      {isSelected && <Transformer ref={transformRef} />}
    </>
  );
}

export default AnnotationBox;
