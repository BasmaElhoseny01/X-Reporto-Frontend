import React, { useState, useRef } from "react";
import { Stage, Layer, Group, Rect, Text } from "react-konva";
import Konva from "konva";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function DraggableBoxWithText({
  x,
  y,
  width,
  height,
  text,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}) {
  const [position, setPosition] = useState({ x, y });
  const [currentText, setCurrentText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    const target = e.target as Konva.Node;
    setPosition({
      x: target.x(),
      y: target.y(),
    });
  };

  const handleTextClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const textNode = e.target as Konva.Text;
    const stage = textNode.getStage();
    const stageBox = stage!.container().getBoundingClientRect();
    const textPosition = textNode.getClientRect();

    setInputPosition({
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    });
    setInputValue(currentText);
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current!.focus();
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    setCurrentText(inputValue);
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  return (
    <>
      <Group
        x={position.x}
        y={position.y}
        draggable
        onDragMove={handleDragMove}
      >
        <Rect width={width} height={height} fill="red" />
        <Text text={currentText} y={height + 5} onClick={handleTextClick} />
      </Group>
      {isEditing && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          style={{
            position: "absolute",
            top: inputPosition.y + "px",
            left: inputPosition.x + "px",
            fontSize: "18px",
            border: "none",
            padding: "4px",
            backgroundColor: "lightyellow",
            zIndex: 1000,
          }}
        />
      )}
    </>
  );
}

function ZoomableStage() {
  return (
    <TransformWrapper>
      <TransformComponent>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <DraggableBoxWithText
              x={20}
              y={20}
              width={100}
              height={100}
              text="Sample Text"
            />
          </Layer>
        </Stage>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default ZoomableStage;
