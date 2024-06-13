import React from "react";

// Styles
import { StyledButton } from "./Button.Styles";

interface ButtonProps {
  // Define props here
  onClick: () => void;
  label: string;
  type?: "primary" | "default" | "dashed" | "text" | "link";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type }) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {label}
    </StyledButton>
  );
};

export default Button;
