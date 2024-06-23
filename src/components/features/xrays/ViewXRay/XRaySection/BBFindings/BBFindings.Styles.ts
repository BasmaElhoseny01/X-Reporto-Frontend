import styled from "styled-components";

// Theme
// import { palette } from "../../../../styles/theme";

// Ant Design
import { Flex } from "antd";

export const BBFindingsSectionContainer = styled(Flex)`
  padding: 5px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  font-size: 18px;

  height: 100%;
`;

export const BBFindingContainer = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  flex: 1;
`;

export const BBAllFindingsContainer = styled(Flex)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  flex: 2;
`;

export const BBFindingTitleContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  img {
    width: 30px;
  }
`;
export const BBFindingButtonsContainer = styled(Flex)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  /* margin-top: 10px; */
  width: 100%;
  flex: 1;

  button {
    margin-left: 10px;
  }
`;
