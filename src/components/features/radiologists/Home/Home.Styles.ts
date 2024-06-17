import styled from "styled-components";

// Theme
// import { palette } from "../../../../styles/theme";

// Ant Design
import { Flex } from "antd";

export const HomeContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  background-color: aliceblue;
  height: 100%;
`;

export const HomeLeftSideContainer = styled(Flex)`
  display: flex;
  flex-direction: column;

  width: 50%;
`;

export const HomeRightSideContainer = styled(Flex)`
  display: flex;
  flex-direction: column;

  width: 50%;
`;
