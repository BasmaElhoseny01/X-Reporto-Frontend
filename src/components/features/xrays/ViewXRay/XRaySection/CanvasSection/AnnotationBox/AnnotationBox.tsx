import React, { useEffect, useRef } from "react";
/* eslint-disable @typescript-eslint/no-unused-vars */

// Third Party Components
import Konva from "konva";
import { Group, Rect, Text, Transformer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

// Antd Components

// Utils
import { hexToRgba } from "../../../../../../../utils";

// Types
import { Box } from "../../../XRay.types";

// Context
import { useTools } from "../../ToolProvider";

// Styles
import { palette } from "../../../../../../../styles/theme";

// Props
interface AnnotationBoxProps {
  shapeProps: Box;
  title: string;

  isSelected: boolean;
  onSelect: () => void;
  onMouseLeave: (event: KonvaEventObject<MouseEvent>) => void;
  onChange: (newAttrs: Box) => void;
}

function AnnotationBox(props: AnnotationBoxProps) {
  const { shapeProps, title, isSelected, onSelect, onChange, onMouseLeave } =
    props;

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
      } else if (navTool === "draw") {
        stage.container().style.cursor = "crosshair";
      } else if (navTool === "move") {
        stage.container().style.cursor = "move";
      }
    }
  };

  return (
    <Group>
      <Rect
        fill={isSelected ? `${hexToRgba(palette.primary, 0.1)}` : "transparent"}
        stroke={isSelected ? `${palette.primary}` : `${palette.error}`}
        strokeWidth={isSelected ? 4 : 2}
        onMouseDown={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={navTool === "move"}
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
          if (node) {
            const scaleX = node.scaleX() ?? 1;
            const scaleY = node.scaleY() ?? 1;

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, (node.width() ?? 5) * scaleX),
              // set minimal value
              height: Math.max(5, (node.height() ?? 5) * scaleY),
            });
          }
        }}
      />
      <Text
        text={title} // Replace with your dynamic label text
        x={
          shapeProps?.width < 0
            ? shapeProps?.x + shapeProps?.width
            : shapeProps?.x
        } // Center text horizontally
        // x={shapeProps.x} // Center text horizontally
        // y={shapeProps.y - 20} // Place text above the rectangle
        y={
          shapeProps?.height < 0
            ? shapeProps?.y + shapeProps?.height - 20
            : shapeProps?.y - 20
        } // Place text above the rectangle
        fontSize={14} // Adjust font size as needed
        align="center"
        width={Math.abs(shapeProps?.width)} // Center text horizontally
        fill={isSelected ? `${palette.primary}` : `${palette.error}`}
      />
      {isSelected && navTool === "move" && (
        <Transformer
          ref={transformRef}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
            "top-center",
            "bottom-center",
            "middle-left",
            "middle-right",
          ]}
          rotateEnabled={false} // Disable rotation explicitly
        />
      )}
    </Group>
  );
}

export default AnnotationBox;
