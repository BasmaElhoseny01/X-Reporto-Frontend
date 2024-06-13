import styled from "styled-components";

// Components
import { Button } from "antd";

// Theme
import { palette } from "../../../styles/theme";

export const StyledButton = styled(Button)`
  background-color: ${palette.warn};
  color: ${palette.primary};
`;
