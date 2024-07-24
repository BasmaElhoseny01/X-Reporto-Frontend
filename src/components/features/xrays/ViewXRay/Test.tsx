import React, { useEffect } from "react";

function Test() {
  useEffect(() => {
    console.log("Test.....");
  }, []);
  return <div>Test</div>;
}

export default Test;
