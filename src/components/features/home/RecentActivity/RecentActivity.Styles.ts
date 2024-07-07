import styled from "styled-components";

// Theme
// import { palette } from "../../../../styles/theme";

// Ant Design
import { Flex } from "antd";

export const ActivityCardsContainer = styled(Flex)`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  justify-content: center;

  overflow-y: scroll;

  /* height: 80%; */
  width: 100%;

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
