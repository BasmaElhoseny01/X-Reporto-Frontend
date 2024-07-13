import React from "react";

// Ant Design
import { Result } from "antd";

// Components
import PrimaryButton from "../../common/PrimaryButton/PrimaryButton";

// Utils
import useCustomNavigate from "../../../hooks/useCustomNavigate";

function Unauthorized() {
  const customNavigate = useCustomNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<PrimaryButton 
        // onClick={reDirectToHome}
        onClick={() => customNavigate.navigateToHome()}
        >Back Home</PrimaryButton>}
    />
  );
}

export default Unauthorized;
