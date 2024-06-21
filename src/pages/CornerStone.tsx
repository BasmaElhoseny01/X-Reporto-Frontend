import React, { useRef, useState, useEffect } from "react";
// import React from "react";
import * as cornerstone from "cornerstone-core";

function CornerStone() {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState(
    elementRef.current ? cornerstone.getViewport(elementRef.current) : undefined
  );

  useEffect(() => {
    if (elementRef.current) {
      setViewport(cornerstone.getViewport(elementRef.current));
    }

    console.log("CornerStone mounted");
    console.log(viewport);
  }, []);

  return <div ref={elementRef}></div>;
}

export default CornerStone;
