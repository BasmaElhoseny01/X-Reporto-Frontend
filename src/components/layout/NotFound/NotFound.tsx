import React from "react";

// Ant Design
import { Result } from "antd";

// Components
import PrimaryButton from "../../common/PrimaryButton/PrimaryButton";

// Utils
import useCustomNavigate from "../../../hooks/useCustomNavigate";

function NotFound() {
  const customNavigate  = useCustomNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<PrimaryButton 
        // onClick={reDirectToHome}
        onClick={() => customNavigate.navigateToHome()}
        >Back Home</PrimaryButton>}
    />
  );
}

export default NotFound;
