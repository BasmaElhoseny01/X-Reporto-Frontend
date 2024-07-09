import styled from "styled-components";

// Theme
import { palette } from "../../../../../styles/theme";

// Ant Design
import { Flex } from "antd";
import TextArea from "antd/es/input/TextArea";

export const BBFindingsSectionContainer = styled(Flex)`
  padding: 0px 5px;

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

export const StyledTextArea = styled(TextArea)`
  width: 95%;
  border-radius: 1%;

  /* min-height: 100px !important; */

  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 6px; /* Width of the scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* Track color */
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* Thumb color */
    border-radius: 3px; /* Rounded corners of the thumb */
  }
`;

export const VerticalDivider = styled.div`
  height: 80%;
  border-left: 2px solid ${palette.grey300};
  margin: 0 10px;
`;

export const BBFindingTitleContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  input {
    width: 50%;

    margin: 10px;
  }

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

export const ButtonContainer = styled(Flex)`
  // display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
  width: 100%;

  & > * {
    margin: 10px 10px;
  }
`;
