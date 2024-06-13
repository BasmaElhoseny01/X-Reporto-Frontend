import styled from "styled-components";

// Theme
import { palette } from "../../../styles/theme";

// Components
import { Button } from "antd";

export const StyledButton = styled(Button)`
  background-color: ${palette.primary};
  color: ${palette.error};
`;
