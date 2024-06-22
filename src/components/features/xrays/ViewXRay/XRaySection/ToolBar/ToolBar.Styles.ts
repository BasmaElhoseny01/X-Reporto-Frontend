import styled from "styled-components";

// Theme
import { palette } from "../../../../../../styles/theme";

// Ant Design
import { Flex } from "antd";

export const ToolBarContainer = styled(Flex)`
  width: 80%;
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  /* Add margin 2 between children */
  & > * {
    margin-right: 5px;
  }
`;

export const VerticalDivider = styled.div`
  height: 80%;
  border-left: 2px solid ${palette.grey300};
  margin: 0 10px;
`;
