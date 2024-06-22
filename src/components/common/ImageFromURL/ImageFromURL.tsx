import React, { useState, useEffect } from "react";
import { Image } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

interface ImageFromUrlProps {
  imageUrl: string;
  setCanvasMeasures: (measures: { width: number; height: number }) => void;
  onMouseDown?: (event: KonvaEventObject<MouseEvent>) => void;
  onMouseUp?: (event: KonvaEventObject<MouseEvent>) => void;
  onMouseMove?: (event: KonvaEventObject<MouseEvent>) => void;
}

const ImageFromUrl: React.FC<ImageFromUrlProps> = ({
  imageUrl,
  setCanvasMeasures,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}) => {
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);

  useEffect(() => {
    const imageToLoad = new window.Image();
    imageToLoad.src = imageUrl;
    imageToLoad.addEventListener("load", () => {
      setImage(imageToLoad);
      setCanvasMeasures({
        width: imageToLoad.width,
        height: imageToLoad.height,
      });
    });

    return () => {
      imageToLoad.removeEventListener("load", () => {
        // Clean-up function to remove event listener
      });
    };
  }, [imageUrl, setCanvasMeasures]);

  return (
    <Image
      image={image}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    />
  );
};

export default ImageFromUrl;
