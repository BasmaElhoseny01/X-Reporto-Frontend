import styled from "styled-components";

// Theme
// import { palette } from "../../../../styles/theme";

// Ant Design
import { Flex, Menu } from "antd";

export const ViewXRayContainer = styled(Flex)`
  background-color: aliceblue;

  display: flex;
  flex-direction: row;

  height: 100%;
`;

export const MenuContainer = styled(Menu)`
  /* background-color: green; */
  border-inline-end: 0;
  height: 100%;
  & .ant-menu-root {
    /* border-inline-end: None; */
    border-inline-end: 0;

    /* border-inline-start */
  }
`;
