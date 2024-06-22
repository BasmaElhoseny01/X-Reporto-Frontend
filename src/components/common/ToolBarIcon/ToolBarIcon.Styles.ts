import styled from "styled-components";

// Theme
import { palette } from "../../../styles/theme";

// Ant Design
import { Flex } from "antd";

export const ToolBarIconButton = styled(Flex)<{ isSelected?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 5px;

  padding: 5px;

  background-color: ${(props) =>
    props.isSelected ? `${palette.secondary}` : `${palette.white}`};

  /* Image */
  & > img {
    /* margin-right: -2px; */
    /* margin-bottom: -3px; */
  }
`;
