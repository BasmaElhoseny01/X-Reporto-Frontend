import React from "react";
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Stage,
  Layer,
  Rect,
  Text,
  Circle,
  Line,
  Star,
  Image,
} from "react-konva";
import useImage from "use-image";
import XRay from "../../../assets/images/a41f8198-de15ea4c-c296f762-721eef61-0288555e.jpg";

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

// the first very simple and recommended way:
const XRayImage = () => {
  const [image] = useImage(XRay);
  return <Image image={image} scaleX={0.2} scaleY={0.2} />;
};

function AnnotationTool() {
  const [stars, setStars] = React.useState(generateShapes());

  const handleDragStart = (e: { target: { id: () => string } }) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => ({
        ...star,
        isDragging: star.id === id,
      }))
    );
  };
  const handleDragEnd = () => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      {/* <Layer>
        <Text text="Some text on canvas" fontSize={15} />
        <Rect
          x={20}
          y={50}
          width={100}
          height={100}
          fill="red"
          shadowBlur={10}
        />
        <Circle x={200} y={100} radius={50} fill="green" />
        <Line
          x={20}
          y={200}
          points={[0, 0, 100, 0, 100, 100]}
          tension={0.5}
          closed
          stroke="black"
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, "red", 1, "yellow"]}
        />
      </Layer> */}

      {/* Draggable Stars */}
      {/* <Layer>
        <Text text="Try to drag a star" />
        {stars.map((star) => (
          <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={5}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={star.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            scaleX={star.isDragging ? 1.2 : 1}
            scaleY={star.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}

        <XRayImage />
      </Layer> */}

      <Layer>
        <XRayImage />
      </Layer>
    </Stage>
  );
}

export default AnnotationTool;
