import styled from "styled-components";

// Theme
import { palette } from "../../../styles/theme";
import { Button } from "antd";

export const SecondaryButtonDark = styled(Button)`
  background-color: transparent;
  border-color: ${palette.white};
  box-shadow: 0 2px 0 ${palette.grey_silver}33;

  /* OnHover */
  &:hover {
    border-color: ${palette.secondary} !important;
    color: ${palette.secondary} !important;

    /* border-color: #323639 !important; */
    /* color: #323639 !important; */
  }
`;
