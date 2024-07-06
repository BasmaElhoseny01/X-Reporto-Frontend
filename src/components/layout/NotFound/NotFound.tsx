import React from "react";

// Ant Design
import { Result } from "antd";

// Components
import PrimaryButton from "../../common/PrimaryButton/PrimaryButton";

// Utils
import { reDirectToHome } from "../../../pages/paths.utils";

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<PrimaryButton onClick={reDirectToHome}>Back Home</PrimaryButton>}
    />
  );
}

export default NotFound;
