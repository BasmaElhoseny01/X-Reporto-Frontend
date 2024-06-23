import styled from "styled-components";

// Theme
// import { palette } from "../../../../styles/theme";

// Ant Design
import { Flex } from "antd";

export const XRaySectionContainer = styled(Flex)`
  padding: 5px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  flex: 1;
  height: 100%;
`;

export const XRayContainer = styled(Flex)`
  padding: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  flex: 1;
  height: 100%;
`;

export const BBFindingsContainer = styled(Flex)`
  border: 1px solid #000;
  padding: 0px 5px;

  /* display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center; */

  flex: 1;
  height: 100%;
`;
