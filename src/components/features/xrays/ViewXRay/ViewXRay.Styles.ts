import styled from "styled-components";

// Theme
// import { palette } from "../../../../styles/theme";

// Ant Design
import { Flex, Tabs } from "antd";

export const ViewXRayContainer = styled(Flex)`
  display: flex;
  // flex-direction: row;

  flex: 1;
  height: 100%;
`;

export const StyledTabs = styled(Tabs)`
  /* background-color: yellow; */
  flex: 1.5;
  height: 100%;

  /* Children Tabs Full Height */
  .ant-tabs-content {
    height: 100%;
  }
  .ant-tabs-tabpane {
    height: 100%;
  }
`;

// export const MenuContainer = styled(Menu)`
//   /* background-color: green; */
//   border-inline-end: 0;
//   height: 100%;
//   & .ant-menu-root {
//     /* border-inline-end: None; */
//     border-inline-end: 0;

//     /* border-inline-start */
//   }
// `;
