import React from "react";

import { PrimaryButtonDark } from "./PrimaryButton.Styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/Reducers";
import { Button, ButtonProps } from "antd";

interface PrimaryButtonProps extends Omit<ButtonProps, "type"> {
  children: React.ReactNode;
}

function PrimaryButton(props: PrimaryButtonProps) {
  const currentTheme = useSelector((state: RootState) => state.theme);

  const { children, ...rest } = props;

  return currentTheme === "light" ? (
    <Button type="primary" {...rest}>
      {children}
    </Button>
  ) : (
    <PrimaryButtonDark type="primary" {...rest}>
      {children}
    </PrimaryButtonDark>
  );
}

export default PrimaryButton;
