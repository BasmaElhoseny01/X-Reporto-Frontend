import React from "react";

// Styles
import { StyledButton } from "./Button.Styles";
interface ButtonProps {
  // Define props here
  onClick: () => void;
  label: string;
  type?: "primary" | "default" | "dashed" | "text" | "link";
}

function Button(props: ButtonProps) {
  return <StyledButton>{props.label}</StyledButton>;
}

export default Button;
