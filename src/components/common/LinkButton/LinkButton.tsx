import React from "react";

import { Button, ButtonProps } from "antd";

interface LinkButtonProps extends Omit<ButtonProps, "type"> {
  children: React.ReactNode;
}

function LinkButton(props: LinkButtonProps) {
  const { children, ...rest } = props;

  return (
    <Button type="link" {...rest} style={{ textDecoration: "underline" }}>
      {children}
    </Button>
  );
}

export default LinkButton;
