import styled from "styled-components";

// Theme
import { palette } from "../../../styles/theme";
import { Button } from "antd";

export const PrimaryButtonDark = styled(Button)`
  background-color: ${palette.secondary};
  color: ${palette.black};
  box-shadow: 0 2px 0 ${palette.grey_silver}33;
`;
