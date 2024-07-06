import React from "react";

// Ant Design
import { Result } from "antd";

// Components
import PrimaryButton from "../../common/PrimaryButton/PrimaryButton";

// Utils
import { reDirectToHome } from "../../../utils";

function Unauthorized() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<PrimaryButton onClick={reDirectToHome}>Back Home</PrimaryButton>}
    />
  );
}

export default Unauthorized;
