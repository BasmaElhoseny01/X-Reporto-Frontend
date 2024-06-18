import React from "react";

// import { Button } from "antd";
import { SecondaryButtonDark } from "./SecondaryButton.Styles";
import { Button, ButtonProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/Reducers";

interface SecondaryButtonProps extends Omit<ButtonProps, "type"> {
  children: React.ReactNode;
}

function SecondaryButton(props: SecondaryButtonProps) {
  const currentTheme = useSelector((state: RootState) => state.theme);

  const { children, ...rest } = props;

  return currentTheme === "light" ? (
    <Button type="default" {...rest} size="middle">
      {children}
    </Button>
  ) : (
    <SecondaryButtonDark type="default" {...rest} size="middle">
      {children}
    </SecondaryButtonDark>
  );

  // return <Button type="default">{children}</Button>;
}

export default SecondaryButton;
