import React from "react";

// Components
import ViewXRay from "../components/features/xrays/ViewXRay/ViewXRay";
import ViewProvider from "../components/features/xrays/ViewXRay/ViewProvider";

function ViewXRayPage() {
  return (
    <ViewProvider>
      <ViewXRay />
    </ViewProvider>
  );
}

export default ViewXRayPage;
