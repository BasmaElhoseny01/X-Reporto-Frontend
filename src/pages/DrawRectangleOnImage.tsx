// import React, { useRef, useEffect, useState } from "react";

// const DrawRectangleOnImage: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const imageRef = useRef<HTMLImageElement | null>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [startPos, setStartPos] = useState({ x: 0, y: 0 });
//   const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");

//     const drawImage = () => {
//       if (ctx && imageRef.current && canvas) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
//       }
//     };

//     if (imageRef.current) {
//       imageRef.current.onload = drawImage;
//       imageRef.current.src =
//         "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"; // Replace with your image path
//     }
//   }, []);

//   const handleMouseDown = (event: React.MouseEvent) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     setStartPos({ x, y });
//     setCurrentPos({ x, y });
//     setIsDrawing(true);
//   };

//   const handleMouseMove = (event: React.MouseEvent) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     setCurrentPos({ x, y });
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   const drawRectangle = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");

//     if (ctx && imageRef.current) {
//       const { x: startX, y: startY } = startPos;
//       const { x: currentX, y: currentY } = currentPos;
//       const width = currentX - startX;
//       const height = currentY - startY;

//       drawImage(); // Redraw the image
//       ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
//       ctx.fillRect(startX, startY, width, height);
//     }
//   };

//   useEffect(() => {
//     if (isDrawing) {
//       drawRectangle();
//     }
//   }, [currentPos]);

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         width={800}
//         height={600}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//       />
//       <img ref={imageRef} style={{ display: "none" }} alt="hidden" />
//     </div>
//   );
// };

// export default DrawRectangleOnImage;
import React from "react";

function DrawRectangleOnImage() {
  return <div>DrawRectangleOnImage</div>;
}

export default DrawRectangleOnImage;
