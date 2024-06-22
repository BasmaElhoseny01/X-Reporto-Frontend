import React, { useEffect, useRef } from "react";
import { Rect, Transformer } from "react-konva";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
// Props
interface AnnotationProps {
  shapeProps: any;

  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}

function Annotation(props: AnnotationProps) {
  const { shapeProps, isSelected, onSelect, onChange } = props;

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
      stage.container().style.cursor = "move";
    }
  };

  const onMouseLeave = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    if (stage) {
      stage.container().style.cursor = "crosshair";
    }
  };

  return (
    <>
      <Rect
        fill="transparent"
        stroke="blue"
        onMouseDown={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDragEnd={(event) => {
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

export default Annotation;
