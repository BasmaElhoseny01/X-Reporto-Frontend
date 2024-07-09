import React from "react";

// Components
import ViewXRayTest from "../components/features/xrays/ViewXRay/ViewXRayTest";
import ViewProvider from "../components/features/xrays/ViewXRay/ViewProvider";

function ViewXRayPageTest() {
  return (
    <ViewProvider>
      <ViewXRayTest />
    </ViewProvider>
  );
}

export default ViewXRayPageTest;
